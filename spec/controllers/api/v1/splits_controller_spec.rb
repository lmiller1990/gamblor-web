require 'rails_helper'

describe Api::V1::SplitsController do
  let!(:league) { create(:league) }
  let!(:summer_split) { create(:split, league: league, start_date: 1.days.ago) }
  let!(:game) { create(:game, split: summer_split) }

  describe 'show' do
    it 'returns games for a split' do
      get :show, params: { id: summer_split.id }

      expect(json_response['games'].count).to be 1
    end
  end
end
