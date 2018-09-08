require 'rails_helper'

describe Api::V1::GamesController do
  describe '/POST' do
    it 'creates a game' do
      expect {
        post :create, params: {
          game: {
            date: DateTime.now,
            red_side_team_id: 1,
            blue_side_team_id: 2
          }
        }
      }.to change(Game, :count).by 1
    end
  end
end
