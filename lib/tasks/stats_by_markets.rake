task :stats_by_markets, [:vals] => :environment do |t, args|
  league_name, market, market_full = args[:vals]
  league = League.find_by_name(league_name)
  games = league.games

  bet_on_underdog = 0

  games.each do |game|
    puts args
    underdog = game["red_side_team_#{market}_odds"] < game["blue_side_team_#{market}_odds"] ? game.blue_side_team : game.red_side_team

    if game["#{market_full}_team_id"] == underdog.id
      if game.red_side_team_id == underdog.id
        bet_on_underdog += game["red_side_team_#{market}_odds"] - 1
      elsif  game.blue_side_team_id == underdog.id
        bet_on_underdog += game["blue_side_team_#{market}_odds"] - 1
      end
    else
      bet_on_underdog -= 1
    end
  end
  
  puts (bet_on_underdog/games.count) * 100

  bet_on_underdog
end
