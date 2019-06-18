require_relative './simulation_result'

class SimulationService
  # options is hash of
  # initial_bankroll
  # bet_amount
  def initialize(recommendations, options)
    @recommendations = recommendations
    @initial_bankroll = options[:initial_bankroll]
    @bet_amount = options[:bet_amount]
  end

  def call
    run_simulation(@recommendations, @initial_bankroll, @bet_amount)
  end

  def run_simulation(recommendations, bankroll, bet_amount)
    bank = bankroll
    bank_init = bank
    wins = 0
    bet_amt = bet_amount
    outcomes = []

    recommendations.each do |r|
      bank -= bet_amt

      # puts "#{r[:date].strftime('%F')}: Bet $#{bet_amt} on #{r[:team][:name]} to get #{r[:market]} vs #{r[:opponent][:name]} @ #{r[:odds]}. Normalized EV: #{r[:ev]}"

      result = nil

      won = r[:game][MarketBetMapper.map(r[:market])] == r[:team][:id]

      if r[:game][MarketBetMapper.map(r[:market])] == r[:team][:id]
        # puts "Won $#{(bet_amt * r[:odds]).round(2)}"
        bank += (bet_amt * r[:odds])
        wins += 1
        result = 1
      else
        result = 0
        # puts "Lost $#{bet_amt}"
      end
      # puts "Balance: #{bank.round(2)}\n\n"
      outcomes << SimulationResult.new(
        r[:id],
        r[:date],
        r[:team],
        r[:opponent],
        r[:market],
        r[:ev],
        r[:odds],
        bet_amt,
        won
      )
    end

    # puts "Initial bankroll: $#{bank_init}"

    percent_profit = ((bank.round(2) - bank_init) / bank_init) * 100
    # puts "Closing balance after #{recommendations.count} bets: #{bank.round(2)}"
    # puts "Wins: #{wins} / #{recommendations.count}"
    # puts "% Profit: #{percent_profit.round(1)}%"

    { 
      outcomes: outcomes,
      accuracy: wins / recommendations.count,
      percent_profit: percent_profit
    }
  end
end
