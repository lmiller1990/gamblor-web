require 'rails_helper'

describe Api::V1::SettingsController do
  let!(:user) { create(:user) }
  let!(:split) { create(:split, name: 'All Games')}

  describe 'GET /' do
    before :each { sign_in user }

    it 'returns current_user bank account' do
      get :index

      expect(json_response['admin']).to be false
      expect(json_response['defaultSplitId']).to be split.id
    end
  end
end