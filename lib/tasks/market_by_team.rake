require 'pry'

markets_map = {
  blood: {
    short: 'fb',
    long: 'blood'
  },
  turret: {
    short: 'ft',
    long: 'turret'
  },
  dragon: {
    short: 'fd',
    long: 'dragon'
  },
  baron: {
    short: 'fbaron',
    long: 'baron'
  }
}

task :market_by_team, [] => :environment do |t, args|
  team_name = 'Team SoloMid'
  team = Team.find_by_name(team_name)
  games = team.games.where(split_id: 4)
  market = 'blood'
  short = markets_map[market.to_sym][:short]
  total = 0
  market_name = "first_#{market}_team_id"
  wins = 0
  losses = 0

  puts "#{team_name} for first #{market}"
  puts "========================================="

  games.each do |game|
    next if game["blue_side_team_#{short}_odds"] == nil or game["red_side_team_#{short}_odds"] == nil

    is_blue_side = game.blue_side_team_id == team.id

    if game[market_name] == team.id
      wins += 1

      if is_blue_side
        print "Win at ", game["blue_side_team_#{short}_odds"], " vs #{game.red_side_team.name}\n"
        total += game["blue_side_team_#{short}_odds"]
      else
        print "Win at ", game["red_side_team_#{short}_odds"], " vs #{game.blue_side_team.name}\n"
        total += game["red_side_team_#{short}_odds"]
      end
    else
      losses += 1
      total -= 1

      if is_blue_side
        puts "Lose"
      else
        puts "Lose"
      end

    end
  end

  puts total
  puts "Wins: #{wins} / #{wins + losses}"
end
