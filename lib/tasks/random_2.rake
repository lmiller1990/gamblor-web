def get_success_at_given_date(team, market, date)
  games = team.games.where('date < ?', date)
  success = 0.0

  games.each do |game|
    if game[MarketBetMapper.map(market)] == team.id
      success += 1
    end
  end

  (success / games.count)
end

def build_recommendation(game, ev, team, opponent, odds, market)
  {
    game: game,
    date: game.date, 
    ev: ev.round(2),
    team: team, 
    market: market,
    odds: odds,
    opponent: opponent
  }
end

def run_simulation(test, train, market, min_ev, min_success_percentage_diff)
  recommendations = []
  test.each do |game|
    team_1, team_2, red = game.teams
    blue = game.blue_side_team_id == team_1.id ? team_1 : team_2
    red = blue == team_1 ? team_2 : team_1

    blue_percent = get_success_at_given_date(blue, market, game.date)
    red_percent = get_success_at_given_date(red, market, game.date)

    blue_odds = game["blue_side_team_#{market}_odds"]
    red_odds = game["red_side_team_#{market}_odds"]

    blue_ev = ((blue_percent + (1 - red_percent)) / 2) * blue_odds
    red_ev = ((red_percent + (1 - blue_percent)) / 2) * red_odds

    ev = min_ev
    diff = min_success_percentage_diff

    if blue_ev > ev and (blue_percent - red_percent) > diff
      recommendations << build_recommendation(game, blue_ev, blue, red, blue_odds, market)
    end

    if red_ev > ev and (red_percent - blue_percent) > diff
      recommendations << build_recommendation(game, red_ev, red, blue, red_odds, market)
    end
  end

  recommendations
end

task :random_2, [] => :environment do |t, args|
  train = Game.where('date > ? and date < ?', Date.new(2019, 1, 1), Date.new(2019, 5, 1)).where(split_id: 4)
  test = Game.where('date > ? and date < ?', Date.new(2019, 5, 30), Date.new(2020, 6, 4)).where.not(winner_id: nil)

  markets = ['fb', 'ft', 'fd', 'fbaron']
  recommendations = []

  markets.each do |market|
    recommendations += run_simulation(test, train, market, 1.05, 0.2)
  end

  bank = 197 #10
  bank_init = bank
  wins = 0
  bet_amt = 30

  puts "Initial bankroll: $#{bank}"

  recommendations.each do |r|
    bank -= bet_amt

    puts "#{r[:date].strftime('%F')}: Bet $#{bet_amt} on #{r[:team][:name]} to get #{r[:market]} vs #{r[:opponent][:name]} @ #{r[:odds]}. Normalized EV: #{r[:ev]}"

    if r[:game][MarketBetMapper.map(r[:market])] == r[:team][:id]
      puts "Won $#{(bet_amt * r[:odds]).round(2)}"
      bank += (bet_amt * r[:odds])
      wins += 1
    else
      puts "Lost $#{bet_amt}"
    end
    puts "Balance: #{bank.round(2)}\n\n"
  end

  percent_profit = ((bank.round(2) - bank_init) / bank_init) * 100
  puts "Closing balance after #{recommendations.count} bets: #{bank.round(2)}"
  puts "Wins: #{wins} / #{recommendations.count}"
  puts "% Profit: #{percent_profit.round(1)}%"
end
