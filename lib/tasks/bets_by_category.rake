task :bets_by_category, [] => :environment do |t, args|
  bets = User.find_by_email('lachlan.miller.1990@outlook.com').bets.where.not(won: nil)

  markets = %w(fb ft fd fbaron)

  print "Total bets: #{bets.count}"

  markets.each do |market|
    amount_spent = 0
    amount_won = 0
    payout = 0
    won = 0.0
    lost = 0.0

    by_market = bets.where(market: market)

    puts "\n\n#{market} #{by_market.count}\n\n"

    by_market.each do |bet|
      amount_spent += bet.price_cents
      payout += bet.payout_cents 
      if bet.payout_cents > 0
        won += 1.0
      else
        lost += 1.0
      end
    end


    percent = (((payout - amount_spent.to_f) / amount_spent) * 100).round(2)

    print "Count: #{by_market.count}. Win: #{won}. Lost #{lost}. (#{((won/(won+lost))*100).round(2)}%).  \nSpent $#{amount_spent / 100}. \nPaid out: $#{payout / 100}. \nTotal Profit: $#{(payout - amount_spent)/100}. (#{percent}%)"
  end
end
