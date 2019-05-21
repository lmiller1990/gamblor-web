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

def show_result?
  false
end

teams = ['Team Liquid', 'Team SoloMid', 'Clutch Gaming', 'Echo Fox', 'Optic Gaming', 'Cloud9', 'Counter Logic Gaming', 'Flyquest', 'Golden Guardians', '100 Thieves']

task :market_by_team, [] => :environment do |t, args|
  results = []

  teams.each do |team_name|
    team = Team.find_by_name(team_name)
    games = team.games.where(split_id: 4)
    market = 'baron'
    short = markets_map[market.to_sym][:short]
    total = 0
    market_name = "first_#{market}_team_id"
    wins = 0
    losses = 0

    # puts "#{team_name} for first #{market}"

    games.each do |game|
      next if game["blue_side_team_#{short}_odds"] == nil or game["red_side_team_#{short}_odds"] == nil

      is_blue_side = game.blue_side_team_id == team.id
      total -= 1

      if game[market_name] == team.id
        wins += 1

        if is_blue_side

          print "#{game.date_only}: Win at ", game["blue_side_team_#{short}_odds"], " vs #{game.red_side_team.name}\n" if show_result?
          total += game["blue_side_team_#{short}_odds"]
        else
          print "#{game.date_only} Win at ", game["red_side_team_#{short}_odds"], " vs #{game.blue_side_team.name}\n" if show_result?
          total += game["red_side_team_#{short}_odds"]
        end
      else
        if is_blue_side
          # puts "#{game.date_only} Lose to #{game.red_side_team.name}." if show_result?
          losses += 1

        else
          # puts "#{game.date_only} Lose to #{game.blue_side_team.name}." if show_result?
          losses += 1
        end
      end
    end

    results << {
      team: team_name,
      profit: total.round(1),
      wins: wins,
      losses: losses
    }

    # puts "Total profit: #{total}"
    # puts "Wins: #{wins} / #{wins + losses}"
  end

  results = results.sort_by { |x| x[:profit] }.reverse

  puts "| Team | Win/Loss | Profit |"
  puts "|------|--------|------------|"

  results.each do |r|
    puts "| #{r[:team]} | #{r[:wins]}/#{r[:wins] + r[:losses]} | #{r[:profit]} |"
  end
end
