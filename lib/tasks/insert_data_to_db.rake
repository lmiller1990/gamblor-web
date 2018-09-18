require 'csv'

desc "Write Oracle's elixir data to database"

def seed_games(games)
  Game.delete_all
  puts "==============\nSeeding Games\n=============="
  games = games.select {|g| g[:player] == 'Team' && g[:league] == 'nalcs' }.uniq! { |g| g[:gameid] }

  games.each_with_index do |game, i|
    new_game = Game.find_or_initialize_by(gameid: game[:gameid])
    team = Team.find_by_name(game[:team])
    opponent = Team.find_by_name(game[:opponent])
    league = League.find_by_name(game[:league])

    new_game.league_id = league.id

    new_game.blue_side_team_id = game[:side] == "0.0" ? team.id : opponent.id
    new_game.red_side_team_id = game[:side] == "1.0" ? team.id : opponent.id

    if game[:fb] 
      new_game.first_blood_team_id = game[:fb] == "0.0" ? team.id : opponent.id
      new_game.first_blood_time = game[:fbtime]
    end

    if game[:ft] 
      new_game.first_turret_team_id = game[:ft] == "0.0" ? team.id : opponent.id
      new_game.first_turret_time = game[:fttime]
    end

    new_game.winner_id = game[:result] == "1.0" ? team.id : opponent.id
    new_game.loser_id = game[:result] == "0.0" ? team.id : opponent.id

    if game[:fd] 
      new_game.first_dragon_team_id = game[:fd] == "0.0" ? team.id : opponent.id
      new_game.first_dragon_time = game[:fdtime]
    end

    if game[:fbaron]
      new_game.first_baron_team_id = game[:fbaron] == "0.0" ? team.id : opponent.id
      new_game.first_baron_time = game[:fbarontime]
    end

    new_game.save!
  end
end

def seed_teams(games)
  puts "==============\nSeeding Teams\n=============="

  games.each do |game|
    if game[:player] == 'Team'
      Team.find_or_create_by(name: game[:team])
    end
  end
end

def seed_players(games)
  pos = Position.find_by_name('unset')
  puts "==============\nSeeding Players\n=============="
  players = []
  games.each do |game|
    if game[:player] != 'Team'
      players << { name: game[:player], team: game[:team] }
    end
  end
  players.uniq! { |p| p[:name] }
  players.reject! { |p| p.nil? }

  players.each do |h|
    player = Player.find_or_create_by(name: h[:name], position_id: pos.id)
    team = Team.find_by_name(h[:team])

    Contract.find_or_create_by!(
      player: player, 
      team: team, 
      start: Time.now.beginning_of_year, 
      end_date: Time.now.end_of_year)
  end
end

def seed_leagues(games)
  leagues = games.map { |g| g[:league] }.uniq

  leagues.each { |x| League.find_or_create_by!(name: x) }
end

def hashify_csv
  df = CSV.read('data_with_opponent.csv')

  data = df.drop(1)
  key = df.first

  games = []

  data.each_with_index do |d|
    game = {}
    key.each_with_index { |k,j| game[k.to_sym] = d[j] if j > 0 }
    games << game
  end

  games
end

task :simulate_recent_games => :environment do
  (1..20).each do |i|
    if i % 2 == 0
      Game.all[i].update_attributes(date: 3.days.ago)
    else
      Game.all[i].update_attributes(date: 7.days.from_now)
    end
  end
end

task :csv_to_db => :environment do
  Position.find_or_create_by! name: 'unset'

  games = hashify_csv

  seed_leagues(games) if League.count == 0
  #seed_teams(games) if Team.count == 0
  #seed_players(games) if Player.count == 0
  seed_games(games)
end
