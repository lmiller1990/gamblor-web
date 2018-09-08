require 'rails_helper'

describe Team do
  describe '#games' do
    let!(:team)  { create(:red_side_team) }
    let!(:victory) { create(:game, winner_id: team.id) }
    let!(:defeat) { create(:game, loser_id: team.id) }

    it 'returns games played' do
      expect(team.games).to eq [victory, defeat]
    end
  end
  
  describe '#current_players' do
    let!(:team) { create(:team) }
  end
end
