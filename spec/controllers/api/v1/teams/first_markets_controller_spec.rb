require 'rails_helper'

describe Api::V1::Teams::FirstMarketsController, type: :controller do

  let!(:team) { create(:team) }
  let!(:game_one) { 
    create(:game, blue_side_team_id: team.id, first_blood_team_id: team.id) }
  let!(:game_two) { 
    create(:game, red_side_team_id: team.id, first_blood_team_id: team.id) }

  describe 'GET /:market' do
    it 'returns array of data representing if team got first market' do
      get :show, params: { team_id: team.id, id: 'first_blood' }

      expect(json_response.length).to eq 2
    end
  end
end
