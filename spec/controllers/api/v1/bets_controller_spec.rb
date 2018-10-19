require 'rails_helper'

describe Api::V1::BetsController, type: :controller do
  let!(:user) { create(:user) }
  let!(:bet_one) { create(:bet, user: user) }
  let!(:bet_two) { create(:bet, user: user) }

  before :each { sign_in user }

  describe 'index' do
    it 'returns bets for the current user' do
      get :index

      expect(json_response.count).to be 2
      expect(json_response.first['game']['id']).to eq bet_one.game.id
    end
  end
end
