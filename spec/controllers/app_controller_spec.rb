require 'rails_helper'

RSpec.describe AppController, type: :controller do

  let!(:user) { create(:user) }

  describe "GET #index" do
    it "returns http success" do
      sign_in user
      get :index

      expect(response).to have_http_status(200)
    end
  end
end
