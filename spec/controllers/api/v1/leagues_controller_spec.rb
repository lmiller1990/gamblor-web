require 'rails_helper'

describe Api::V1::LeaguesController do
  let!(:league) { create(:league) }
  let!(:summer_split) { create(:split, league: league, start_date: 1.days.ago) }
  let!(:spring_split) { create(:split, league: league, start_date: 2.day.ago) }

  describe 'GET /' do
    it 'gets leagues and splits' do
      get :index

      expect(json_response[0]['splits'].count).to be 2
    end
  end
end
