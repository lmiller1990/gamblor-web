require 'rails_helper'

describe Team do
  let!(:team)  { create(:red_side_team) }
  let!(:defeat) { create(:game, red_side_team_id: team.id, date: 2.day.ago) }
  let!(:victory) { create(:game, blue_side_team_id: team.id, date: 1.days.ago) }

  let!(:player) { create(:player) }
  let!(:team) { create(:team) }

  describe '#games' do
    it 'returns games played in chronological order' do
      expect(team.games).to eq [defeat, victory]
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
