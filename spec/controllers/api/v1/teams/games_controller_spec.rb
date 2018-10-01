
require 'rails_helper'

describe Api::V1::Teams::GamesController, type: :controller do

  let!(:team) { create(:team) }
  let!(:game_team_won) { create(:game, winner_id: team.id) }
  let!(:game_team_lost) { create(:game, loser_id: team.id) }
  let!(:game_without_team) { create(:game) }

  describe 'GET /' do
    it 'returns a team participated in' do
      get :index

      expect(json_response.first['id']).to eq game_team_won.id
      expect(json_response.last['id']).to eq game_team_won.id
    end
  end
end
