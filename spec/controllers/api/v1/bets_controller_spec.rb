require 'rails_helper'

describe Api::V1::BetsController, type: :controller do
  let!(:user) { create(:user) }
  let!(:game) { create(:game, :with_teams) }
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

  describe 'create' do
    it 'persists a bet to the database' do
      expect do
        post :create, params: {
          bet: {
            price_cents: 1000,
            market: 'ft',
            game_id: game.id,
            team_bet_on_id: game.red_side_team_id
          }
        }
      end.to change(game.bets, :count).by 1

      expect(json_response['id']).to be user.bets.last.id
    end
  end
end
