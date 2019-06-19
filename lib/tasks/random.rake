require 'pp'

def simulate(team, market)
  games = team.games.order(date: :desc)

  train = games[0..games.count - 6]
  test = games.last(6)

  team_map = {}
  team_map[team.id] = { id: team.id, wins: 0, successes: 0, team_games: train }

  exp_start_date = train[0].date
  exp_end_date = train[-1].date


  games.each do |game|
    opponent = game.opposing_team(team)
    team_map[opponent.id] = { 
      id: opponent.id,
      wins: 0,
      successes: 0,
      team_games: opponent.games.where('date > ? and date < ?', exp_start_date, exp_end_date),
      power_level: 0
    }
  end

  market_id = MarketBetMapper.map(market)
  team_map.each do |k, v|
    v[:team_games].each do |game|
      if game[market_id] == v[:id]
        v[:successes] += 1.0
      end

      if game.winner_id == v[:id]
        v[:wins] += 1.0
      end
    end
  end

  team_map.each do |k, v|
    v[:power_level] = (v[:wins] / v[:team_games].count).round(2)
    v[:success_percent] = (v[:successes] / v[:team_games].count).round(2)
    # puts "#{Team.find(k).name} Success: #{v[:success_percent]}%. Power level: #{v[:power_level]}"
  end

  correct = 0.0
  bank = 10.0
  bets_placed = 0.0
  correct_predictions = 0.0

  test.each do |game|
    opponent = game.opposing_team(team)
    side = game.red_side_team_id == team.id ? 'red': 'blue'
    odds = side == 'red' ? game["red_side_team_#{market}_odds"] : game["blue_side_team_#{market}_odds"]
    my_per = team_map[team.id][:success_percent] 
    op_per = team_map[opponent.id][:success_percent]
    should_get = my_per > op_per
    actual = game[market_id] == team.id

    if should_get == actual
      correct_predictions += 1
    end
    # puts "Odds: #{odds}. (vs #{opponent.name})"

    if should_get
      puts "Bet on getting vs #{opponent.name}. Bank: #{bank.round(2)}"
      bets_placed += 1
      bank -= 10.0

      if should_get == actual
        correct += 1
        bank += odds * 10.0
        # puts "Won! Bank: #{bank.round(2)}"
      else
        # puts "Lost! Bank: #{bank.round(2)}"
      end
    end


  end
  # puts "\n#{team.name} to get #{market}"
  # puts "Accuracy: #{((correct/test.count) * 100).round(2)}%"
  # puts "Bank: $#{bank.round(2)}. Profit: $#{(bank - 10).round(2)} ( #{ (((bank - 10.0) / 10) * 100).round(2) } % )"

  return {
    bet_accuracy: correct > 0 ? ((correct/bets_placed) * 100).round(2) : 0,
    correct_predictions: correct_predictions,
    correct_predictions_percent: ((correct_predictions / test.count) * 100).round(2),
    profit_percentage: (((bank - 10.0) / 10) * 100).round(2),
    profit_dollars: (bank - 10).round(2),
    bets_placed: bets_placed,
    market: market,
    team: team.name
  }
end

task :random, [] => :environment do |t, args|
  #teams = ['Team Liquid', 'Team SoloMid', 'Clutch Gaming', 'Echo Fox', 'Optic Gaming', 'Cloud9', 'Counter Logic Gaming', 'Flyquest', 'Golden Guardians', '100 Thieves']
  teams = ['Golden Guardians']

  markets = ['fd'] #, 'ft', 'fd', 'fbaron']

  results  = []

  teams.each do |t|
    markets.each do |m|
      team = Team.find_by_name(t)
      result = simulate(team, m)
      results << result
    end
  end

  results = results.sort_by do |x|
    -x[:correct_predictions_percent]
  end

  puts "\n\n\n\n\n"

  (1..10).each do |i|
    puts results[i-1]
  end
end
