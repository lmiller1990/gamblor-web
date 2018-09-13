require 'rails_helper'

describe Api::V1::UpcomingGamesController, type: :controller do
  let!(:game_one) { create(:game, date: 5.days.ago) }
  let!(:game_two) { create(:game, date: 2.days.ago) }

  describe 'GET /' do
    it 'gets games from three days ago' do
      get :index

      expect(json_response.length).to eq 1
    end
  end
end
