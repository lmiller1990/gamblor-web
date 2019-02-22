require 'rails_helper'

describe Api::V1::Games::DuplicateController do
  describe '#create' do
    let!(:game) { create(:game) }

    it 'duplicates a game and resets first markets' do
      post :create, params: { game_id: game.id }

      expect(json_response['winner_id']).to be nil
      expect(json_response['id']).not_to be game.id
      expect(json_response['game_number']).to be 2
    end  
  end
end
