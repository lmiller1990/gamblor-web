require 'rails_helper'

describe Api::V1::Leagues::SplitsController do
  let!(:league) { create(:league) }
  let!(:summer_split) { create(:split, league: league, start_date: 1.days.ago) }
  let!(:spring_split) { create(:split, league: league, start_date: 2.day.ago) }

  let!(:another_league) { create(:league) }
  let!(:another_league_split) { create(:split, league: another_league) }

  describe '/' do
    it 'gets splits for a league in chronological order' do
      get :index, params: { league_id: league.id }

      expect(json_response[0]['id']).to eq spring_split.id
      expect(json_response[1]['id']).to eq summer_split.id
      expect(json_response.length).to eq 2
    end
  end
end
