require 'rails_helper'

describe Api::V1::UnsettledBetsController, type: :controller do
  let!(:user) { create(:user) }
  let!(:game) { create(:game) }
  let!(:settled_bet) { create(:settled_bet, user: user) }
  let!(:unsettled_bet) { create(:unsettled_bet, user: user) }

  before :each { sign_in user }

  describe 'GET /' do
    it 'returns unsettled bets for current user in reverse chronological order' do
      get :index

      expect(json_response.count).to be 1
      expect(json_response.first['game']['id']).to eq unsettled_bet.game.id
    end
  end
end