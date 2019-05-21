def percent(num, total)
  ((num/total) * 100).round(2)
end

task :side_market, [] => :environment do |t, args|
  games = Game.where.not(winner_id: nil).where(split_id: 4)

  ['blood', 'turret', 'dragon', 'baron'].each do |market|
    blue_side = 0.0
    red_side = 0.0

    games.each do |game|
      first_id = game["first_#{market}_team_id"]

      if game.blue_side_team_id == first_id
        blue_side += 1
      elsif game.red_side_team_id == first_id
        red_side +=1
      end
    end

    total = games.count

    puts "Market: #{market}\n==============="
    puts "Blue: #{blue_side} / #{total} (#{ percent(blue_side, total) }%)"
    puts "Red: #{red_side} / #{total} (#{ percent(red_side, total) }%)\n\n"
  end


  blue_side = 0.0
  red_side = 0.0

  games.each do |game|
    first_id = game.winner_id

    if game.blue_side_team_id == first_id
      blue_side += 1
    elsif game.red_side_team_id == first_id
      red_side +=1
    end
  end

  total = games.count

  puts "Market: Winner\n==============="
  puts "Blue: #{blue_side} / #{total} (#{ percent(blue_side, total) }%)"
  puts "Red: #{red_side} / #{total} (#{ percent(red_side, total) }%)\n\n"

end

task :side_market_by_splits, [] => :environment do |t, args|
  Split.all.each do |split|

    games = Game.where.not(winner_id: nil).where(split_id: split.id)

    puts "#{split.league.name} - #{split.name}\n\n\n"

    ['blood', 'turret', 'dragon', 'baron'].each do |market|
      blue_side = 0.0
      red_side = 0.0

      games.each do |game|
        first_id = game["first_#{market}_team_id"]

        if game.blue_side_team_id == first_id
          blue_side += 1
        elsif game.red_side_team_id == first_id
          red_side +=1
        end
      end

      total = games.count

      puts "Market: #{market}\n==============="
      puts "Blue: #{blue_side} / #{total} (#{ percent(blue_side, total) }%)"
      puts "Red: #{red_side} / #{total} (#{ percent(red_side, total) }%)\n\n"
    end


    blue_side = 0.0
    red_side = 0.0

    games.each do |game|
      first_id = game.winner_id

      if game.blue_side_team_id == first_id
        blue_side += 1
      elsif game.red_side_team_id == first_id
        red_side +=1
      end
    end

    total = games.count

    puts "Market: Winner\n==============="
    puts "Blue: #{blue_side} / #{total} (#{ percent(blue_side, total) }%)"
    puts "Red: #{red_side} / #{total} (#{ percent(red_side, total) }%)\n\n"

  end
end
