require 'rails_helper'

describe Team do
  let!(:team)  { create(:red_side_team) }
  let!(:victory) { create(:game, winner_id: team.id) }
  let!(:defeat) { create(:game, loser_id: team.id) }

  let!(:player) { create(:player) }
  let!(:team) { create(:team) }

  describe '#games' do
    it 'returns games played' do
      expect(team.games).to eq [victory, defeat]
    end
  end

  describe '#current_players' do
    it 'returns players currently under contract' do
      create(:contract, :future_end_date, player_id: player.id, team_id: team.id)

      expect(team.current_players).to eq [ player ]
    end
  end

  describe '#past_players' do
    it 'returns players currently under contract' do
      create(:contract, :past_date, player_id: player.id, team_id: team.id)

      expect(team.past_players).to eq [ player ]
    end
  end
end
