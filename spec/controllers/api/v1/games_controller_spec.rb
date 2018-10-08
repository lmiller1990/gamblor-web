require 'rails_helper'

describe Api::V1::GamesController do
  describe '/POST' do
    let!(:league) { create(:league) }
    let!(:split)  { create(:split)  }

    it 'creates a game' do
      expect {
        post :create, params: {
          game: {
            date: DateTime.now,
            red_side_team_id: 1,
            blue_side_team_id: 2,
            league_id: league.id,
            split_id: split.id,
            game_number: 1
          }
        }
      }.to change(Game, :count).by 1
    end
  end
end
