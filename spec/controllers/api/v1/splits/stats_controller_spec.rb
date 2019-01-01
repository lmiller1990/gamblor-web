require 'rails_helper'

describe Api::V1::Splits::StatsController do
  let!(:split) {  create(:split) }

  describe 'GET /' do

    it 'gets stats for a split' do
      get :index, params: { split_id: split.id }

      expect(response.status).to be 200
    end
  end
end