require 'rails_helper'

describe Api::V1::UpcomingGamesController, type: :controller do
  (1..10).each do |i| 
    let!("game_#{i}_days_ago".to_sym) { create(:game, date: i.days.ago) }
  end

  (1..10).each do |i| 
    let!("game_#{i}_days_from_now".to_sym) { create(:game, date: i.days.from_now) }
  end

  describe 'GET /' do
    it 'gets past 10 and upcoming 5 games' do
      get :index

      expect(json_response.first['id']).to eq game_10_days_ago.id
      expect(json_response.last['id']).to eq game_5_days_from_now.id
    end
  end
end
