class SettleBetsService
  def initialize(game)
    @game = game
  end

  def call
    @game.bets.each do |bet|
      # check the bet market against the game team id
      # for example if bet.market = 'ft', 
      # check against game.first_turret_team_id
      column = MarketBetMapper.map(bet.market)

      if bet.team_bet_on_id == @game[column]
        amount_won = settle_win(bet) 
        BankAccountManager.new(bet.user.bank_account).credit(amount_won)
      else
        settle_lost(bet)
      end
    end
  end

  def settle_win(bet)
    bet.won = true
    amount_won = bet.odds * bet.price_cents
    bet.payout_cents = amount_won
    bet.save!

    amount_won
  end

  def settle_lost(bet)
    bet.won = false
    bet.payout_cents = 0
    bet.save!
  end
end
