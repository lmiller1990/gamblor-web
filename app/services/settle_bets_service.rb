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

      settle(bet) if bet.team_bet_on_id == @game[column]
    end
  end

  def settle(bet)
    bet.won = true
    bet.payout_cents = bet.odds * bet.price_cents
    bet.save!
  end
end
