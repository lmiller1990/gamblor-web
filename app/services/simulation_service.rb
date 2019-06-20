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
    total_money_bet = 0
    sum_exp_value = 0

    recommendations.each do |r|
      sum_exp_value += r[:ev]
      bank -= bet_amt
      result = nil
      won = r[:game][MarketBetMapper.map(r[:market])] == r[:team][:id]
      total_money_bet += bet_amt

      if r[:game][MarketBetMapper.map(r[:market])] == r[:team][:id]
        bank += (bet_amt * r[:odds])
        wins += 1
        result = 1
      else
        result = 0
      end

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

    percent_profit = ((bank.round(2) - bank_init) / bank_init) * 100

    mean_expected_value = recommendations.count > 0 ? sum_exp_value / recommendations.count : 0 
    { 
      outcomes: outcomes,
      accuracy: recommendations.count > 0 ? wins / recommendations.count : 0,
      final_bankroll: bank,
      percent_profit: percent_profit,
      mean_expected_value: mean_expected_value,
      expected_final_bankroll: recommendations.count > 0 ? (sum_exp_value / recommendations.count) * recommendations.count * bet_amount : 0,
      total_money_bet: total_money_bet
    }
  end
end
