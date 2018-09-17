require 'csv'

desc "Write Oracle's elixir data to database"

def seed_games(games)
  Game.delete_all
  puts "==============\nSeeding Gamesa\n=============="
  games = games.select {|g| g[:player] == 'Team' }.uniq! { |g| g[:gameid] }


  games.each_with_index do |game, i|
    if i == 1
      puts game
      puts game[:team]
    end
    new_game = Game.find_or_initialize_by(id: game[:gameid])
    team = Team.find_by_name(game[:team])
    opponent = Team.find_by_name(game[:opponent])

    puts game[:side]
    new_game.blue_side_team_id = game[:side] == "0.0" ? team.id : opponent.id
    new_game.red_side_team_id = game[:side] == "1.0" ? team.id : opponent.id

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

task :csv_to_db => :environment do
  Position.find_or_create_by! name: 'unset'
  df = CSV.read('data_with_opponent.csv')

  data = df.drop(1)
  key = df.first

  games = []

  data.each_with_index do |d|
    game = {}

    key.each_with_index do |k,j|
      game[k.to_sym] = d[j] if j > 0
    end

    games << game
  end

  #seed_teams(games)
  #seed_players(games)
  seed_games(games)
  0
end
