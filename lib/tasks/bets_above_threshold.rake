task :bets_above_threshold, [] => :environment do |t, args|
  # bets = User.find_by_email('lachlan.miller.1990@outlook.com').bets.where.not(won: nil)

  splits = Split.where(id: [4,5,6,7,8,10,11])
  grand_total = 0

  splits.each do |split|

    games = Game.where('created_at > ?', Date.new(2019, 01, 01)).where(split_id: split.id)
    total = 0.0
    bet = 10.0
    market = 'dragon'
    fb = 'fd'
    threshold = 2
    bet_count = 0
    win_count = 0.0


    puts "Split #{split.league.name}: #{split.name}"
    games.each do |game|
      did_bet = false

      if game["red_side_team_#{fb}_odds"] and game["red_side_team_#{fb}_odds"] > threshold
        did_bet = true
        bet_count += 1

        if game["first_#{market}_team_id"] == game.red_side_team_id
          odds = game["red_side_team_#{fb}_odds"] 
          # puts "Bet $10 @ #{odds} winning #{bet * odds}"

          total = total + ((bet * odds) - bet)
          win_count += 1
        else
          # puts "Lost $10"
          total = total - bet
        end
      end

      if game["blue_side_team_#{fb}_odds"] and game["blue_side_team_#{fb}_odds"] > threshold
        did_bet = true
        bet_count += 1
        if game["first_#{market}_team_id"] == game.blue_side_team_id
          odds = game["blue_side_team_#{fb}_odds"]
          # puts "Bet $10 @ #{odds} winning #{bet * odds}"

          total = total + (bet * odds)
          win_count += 1
        else
          # puts "Lost $10"
          total = total - bet
        end
      end

      # puts "Running total #{total}" if did_bet
    end

    puts "Total #{total}. Won #{win_count} / #{bet_count} (#{(win_count / bet_count * 100).round(2)}%)"
    grand_total += total
    puts "\n"
  end

  puts "Grand total #{grand_total}"
end
