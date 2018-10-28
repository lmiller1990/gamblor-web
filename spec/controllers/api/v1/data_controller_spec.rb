require 'rails_helper'

describe Api::V1::DataController, type: :controller do
  class GameDataCsvService
    def call
    end
  end

  describe 'index' do
    it 'calls a service to get a csv' do
      get :index
      
      expect(response.status).to be 200
    end
  end
end
