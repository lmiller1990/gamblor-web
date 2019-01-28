require 'rails_helper'

describe Api::V1::UncollectedGamesController, type: :controller do
  let!(:team) { create(:team) }
  let!(:opponent) { create(:team) }
  let!(:completed_game) { create(:game, winner_id: team.id, loser_id: opponent.id) }
  let!(:incompleted_game) { create(:game, winner_id: nil, loser_id: nil) }

  describe '/' do
    it 'returns all games without winner and loser' do
      get :index 

      expect(json_response.first['id']).to eq incompleted_game.id
      expect(json_response.count).to be 1
    end
  end
end
