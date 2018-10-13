task :stats_by_markets, [:vals] => :environment do |t, args|
  markets = [
    ['World Championship', 'fb', 'first_blood_team'],
    ['World Championship', 'ft', 'first_turret_team'],
    ['World Championship', 'fd', 'first_dragon_team'],
    ['World Championship', 'fbaron', 'first_baron_team'],
    ['World Championship', 'win', 'winner']
  ]

  league = League.find_by_name('World Championship')
  games = league.games

  markets.each do |market|
    league_name, market, market_full = market

    bet_on_underdog = 0
    bet_on_fave = 0

    games.each do |game|
      underdog = game["red_side_team_#{market}_odds"] < game["blue_side_team_#{market}_odds"] ? game.blue_side_team : game.red_side_team

      if game["#{market_full}_id"] == underdog.id
        bet_on_fave -= 1

        if game.red_side_team_id == underdog.id
          bet_on_underdog += game["red_side_team_#{market}_odds"] - 1
        elsif  game.blue_side_team_id == underdog.id
          bet_on_underdog += game["blue_side_team_#{market}_odds"] - 1
        end
      else
        bet_on_underdog -= 1

        if game.red_side_team_id == underdog.id
          bet_on_fave += game["blue_side_team_#{market}_odds"] - 1
        elsif  game.blue_side_team_id == underdog.id
          bet_on_fave += game["red_side_team_#{market}_odds"] - 1
        end
      end
    end

    puts "Market: #{market_full}"
    puts "  underdog #{(bet_on_underdog/games.count) * 100}"
    puts "  favorite #{(bet_on_fave/games.count) * 100}"
  end
end
