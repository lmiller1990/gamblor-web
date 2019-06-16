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

task :random_2, [] => :environment do |t, args|
  train = Game.where('date > ? and date < ?', Date.new(2019, 1, 1), Date.new(2019, 5, 1)).where(split_id: 4)
  test = Game.where('date > ? and date < ?', Date.new(2019, 5, 30), Date.new(2020, 6, 4))

  markets = ['fb', 'ft', 'fd', 'fbaron']
  recommendations = []

  markets.each do |market|
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

      EV = 1.1
      if blue_ev > EV
        recommendations << { 
          game: game,
          date: game.date, 
          team: blue, 
          market: market,
          odds: blue_odds,
          opponent: red
        }
      end

      if red_ev > EV
        recommendations << { 
          game: game,
          date: game.date, 
          team: red, 
          market: market,
          odds: red_odds,
          opponent: blue
        }
      end
    end
  end

  bank = 10

  puts "Initial bankroll: $10"

  recommendations.each do |r|
    bank -= 10

    puts "#{r[:date].strftime('%F')}: Bet $10 on #{r[:team][:name]} to get #{r[:market]} vs #{r[:opponent][:name]} @ #{r[:odds]}"

    if r[:game][MarketBetMapper.map(r[:market])] == r[:team][:id]
      puts "Won $#{(10 * r[:odds]).round(2)}"
      bank += (10 * r[:odds])
    else
      puts "Lost $10"
    end
    puts "Balance: #{bank.round(2)}\n\n"
  end

  puts "Closing balance after #{recommendations.count} bets: #{bank.round(2)}"
end
