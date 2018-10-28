require 'csv'

def first_team(game, market)
  if team = game.first_team_to_get(market)
    team.name
  else
    nil
  end
end

task :db_to_csv, [] => :environment do |t, args|
  games = []
  Game.all.each do |game|
    begin 
    d = {
      id: game.id,
      date: game.date,
      red_side_team_id: game.red_side_team_id,
      blue_side_team_id: game.blue_side_team_id,
      red_side: game.red_side_team.name,
      blue_side: game.blue_side_team.name,
      red_side_win_odds: game.red_side_team_win_odds,
      blue_side_win_odds: game.blue_side_team_win_odds,
      fb_team: first_team(game, 'blood'),
      red_side_fb_odds: game.red_side_team_fb_odds,
      blue_side_fb_odds: game.blue_side_team_fb_odds,
      ft_team: first_team(game, 'turret'),
      red_side_ft_odds: game.red_side_team_ft_odds,
      blue_side_ft_odds: game.blue_side_team_ft_odds,
      first_turret: game.first_turret_type,
      fd_team: first_team(game, 'dragon'),
      red_side_fd_odds: game.red_side_team_fd_odds,
      blue_side_fd_odds: game.blue_side_team_fd_odds,
      fbaron_team: first_team(game, 'baron'),
      red_side_fbaron_odds: game.red_side_team_fbaron_odds,
      blue_side_fbaron_odds: game.blue_side_team_fbaron_odds,
      winner: game.winner_id ? game.winner.name : nil,
      loser: game.loser_id ? game.loser.name : nil,
      split: game.split_id ? game.split.name : nil,
      league: game.league_id ? game.league.name : nil
    }
    rescue
      puts "Error for #{game.id}"
    end

    games << d
  end
  
  CSV.open('data.csv', 'wb') do |csv|
    csv << games.first.keys

    games.each do |game|
      csv << game.values
    end
  end
end
