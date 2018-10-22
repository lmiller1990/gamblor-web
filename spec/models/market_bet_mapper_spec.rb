require_relative '../../app/models/market_bet_mapper'

describe MarketBetMapper do
  it 'returns the correct column' do
    expect(described_class.map('ft')).to eq 'first_turret_team_id'
  end
end
