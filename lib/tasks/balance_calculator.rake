task :balance_calculator, [] => :environment do |t, args|
  bets = User.find_by_email('lachlan.miller.1990@outlook.com').bets

  puts bets.count
  sum = 20000

  tied = 0

  bets.each do |bet|
    sum -= bet.price_cents

    if bet.won == true
      sum += bet.payout_cents
    end
  end

  puts sum
  puts tied
end
