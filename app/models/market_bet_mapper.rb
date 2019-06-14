module MarketBetMapper
  # map market to corresponding game column
  SHORT_NAME_TO_GAME_COLUMN = {
    fb: 'first_blood_team_id',
    ft: 'first_turret_team_id',
    fd: 'first_dragon_team_id',
    fbaron: 'first_baron_team_id',
    win: 'winner_id'
  }

  SHORT_NAME_TO_PRETTY = {
    fb: 'First Blood',
    ft: 'First Turret',
    fd: 'First Dragon',
    fbaron: 'First Baron',
    win: 'winner_id'
  }

  def self.map(market)
    SHORT_NAME_TO_GAME_COLUMN[market.to_sym]
  end

  def self.prettify(market_short_name)
    SHORT_NAME_TO_PRETTY[market_short_name.to_sym]
  end
end
