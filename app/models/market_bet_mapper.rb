module MarketBetMapper
  # map market to corresponding game column
  SHORT_NAME_TO_GAME_COLUMN = {
    fb: 'first_blood_team_id',
    ft: 'first_turret_team_id',
    fd: 'first_dragon_team_id',
    fbaron: 'first_baron_team_id',
    win: 'winner_id'
  }

  def self.map(market)
    SHORT_NAME_TO_GAME_COLUMN[market.to_sym]
  end
end
