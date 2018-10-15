require 'rails_helper'

describe Admin::OddsScraperController, type: :controller do
  describe 'GET /' do
    it 'returns 200' do
      get :index

      expect(response.status).to be 200
    end
  end
end
