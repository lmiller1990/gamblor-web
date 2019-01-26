task :balance_calculator, [] => :environment do |t, args|
  bets = User.find_by_email('lachlan.miller.1990@outlook.com').bets

  puts bets.count
  sum = 20000

  tied = 0

  bets.each do |bet|
    if bet.won == nil
      sum -= bet.price_cents
    end

    if bet.won == true
      puts bet.payout_cents
      sum += bet.payout_cents
    end

    if bet.won == false
      sum -= bet.price_cents
    end
  end

  puts sum
  puts tied
end
