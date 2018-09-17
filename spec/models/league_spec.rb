require 'rails_helper'

RSpec.describe League, type: :model do
  let!(:league) { create(:league) }
  let!(:game) { create(:game, league: league) }

  it 'has a game' do
    expect(league.games.count).to eq 1
  end
end
