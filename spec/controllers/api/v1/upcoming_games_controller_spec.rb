require 'rails_helper'

describe Api::V1::UpcomingGamesController, type: :controller do
  let!(:team) { create(:team) }
  (1..10).each do |i| 
    let!("game_#{i}_days_ago".to_sym) { create(:game, date: i.days.ago, winner_id: team.id) }
  end

  (1..10).each do |i| 
    let!("game_#{i}_days_from_now".to_sym) { create(:game, date: i.days.from_now, winner_id: team.id) }
  end

  describe 'GET /' do
    it 'gets past 10 and upcoming 6 games' do
      get :index

      expect(json_response.first['id']).to eq game_10_days_ago.id
      expect(json_response.last['id']).to eq game_6_days_from_now.id
    end
  end
end
