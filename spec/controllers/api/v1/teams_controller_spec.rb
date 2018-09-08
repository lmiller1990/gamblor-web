require 'rails_helper'

describe Api::V1::TeamsController, type: :controller do

  let!(:team) { create_list(:team, 2) }
  let!(:won_game) { create(:game, winner_id: team.first.id) }
  let!(:lost_game) { create(:game, loser_id: team.first.id) }

  describe 'GET /:id' do
    it 'returns team information and games played' do
      get :show, params: { id: team.first.id }

      expect(json_response['team']['name']).to eq team.first.name
      expect(json_response['games'].length).to eq 2
    end

    describe 'GET /' do
      it 'returns a list of all teams' do
        get :index

        expect(json_response.length).to eq 2
      end
    end
  end
end
