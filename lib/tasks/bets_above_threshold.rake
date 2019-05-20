require 'csv'
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

def game_title(game)
  game.teams.map { |x| x.name }.join ' vs '
end

def print_progress? 
  false 
end

BET = 10
write_results = true

task :bets_above_threshold, [] => :environment do |t, args|
  # bets = User.find_by_email('lachlan.miller.1990@outlook.com').bets.where.not(won: nil)

  splits = Split.where(id: 4)
  grand_total = 0

  cols = %w(game_id blue_team red_team blue_odds red_odds bet_on_blue? bet_on_red? winning_team blue_profit red_profit overall_profit)
  rows = []

  splits.each do |split|
    puts "Split #{split.league.name}: #{split.name}"
    games = Game
      .where('created_at > ?', Date.new(2019, 01, 01))
      .where(split_id: split.id)

    [1.7].each do |threshold|

      total = 0.0
      market = 'blood' # blood baron dragon
      short = markets_map[market.to_sym][:short]
      bet_count = 0
      win_count = 0.0

      games.each do |game|
        row = {}
        row[:game_id] = game.id
        did_bet = false

        red_side_odds = game["red_side_team_#{short}_odds"]
        blue_side_odds = game["blue_side_team_#{short}_odds"]

        if red_side_odds == nil or blue_side_odds == nil
          next
        end

        do_double_bets = false
        best_odds_by_side = red_side_odds > blue_side_odds ? 'red' : 'blue'

        row[:blue_team] = game.blue_side_team.name
        row[:red_team] = game.red_side_team.name

        row[:red_odds] = red_side_odds
        row[:blue_odds] = blue_side_odds

        # cols = %w(blue_team red_team red_odds blue_odds bet_on_blue? bet_on_red? blue_profit red_profit overall_profit)
        if (best_odds_by_side == 'blue' or do_double_bets) and (blue_side_odds > threshold)

          row[:bet_on_blue?] = 1
          did_bet = true
          bet_count += 1

          if game["first_#{market}_team_id"] == game.blue_side_team_id
            row[:winning_team] = game.blue_side_team.name
            odds = blue_side_odds
            row[:blue_profit] = (odds * BET) - BET
            puts "Bet $10 @ #{odds} winning #{BET * odds}" if print_progress?

            total = total + ((BET * odds) - BET)
            win_count += 1
          else
            puts "Lost $10" if print_progress?
            row[:blue_profit] = -BET
            total = total - BET
          end
        else
          #
        end

        if (best_odds_by_side == 'red' or do_double_bets) and (red_side_odds > threshold)

          row[:bet_on_red?] = 1
          did_bet = true
          bet_count += 1

          if game["first_#{market}_team_id"] == game.red_side_team_id
            odds = red_side_odds
            row[:red_profit] = (odds * BET) - BET
            row[:winning_team] = game.red_side_team.name

            total = total + ((BET * odds) - BET)
            win_count += 1
          else
            row[:red_profit] = -BET
            total = total - BET
          end
        else
          # 
        end

        rows << row
        # puts "Running total #{total}" if did_bet
      end

      puts "Threshold: #{threshold}"
      puts "Total #{total}. Won #{win_count} / #{bet_count} (#{(win_count / bet_count * 100).round(2)}%)"
      grand_total += total
      puts "\n"
    end

    overall = 0

    if write_results
      CSV.open('results.csv', 'w') do |csv|
        csv << cols

        rows.each do |row|
          vals = []
          cols.each do |col|
            if col == 'overall_profit' and row[:blue_profit] and row[:red_profit]
              diff = (row[:blue_profit] + row[:red_profit]).round(2)
              row[:overall_profit] = diff
              overall += diff
            end

            vals << row[col.to_sym] || 0
          end
          csv << vals
        end
      end
    end
  end
end
