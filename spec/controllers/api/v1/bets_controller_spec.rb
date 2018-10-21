require 'rails_helper'

describe Api::V1::BetsController, type: :controller do
  RED_SIDE_ODDS = 1.5
  let!(:user) { create(:user) }
  let!(:game) { create(:game, :with_teams, red_side_team_fb_odds: RED_SIDE_ODDS) }

  before :each { sign_in user }

  describe 'index' do
    let!(:bet_one) { create(:bet, user: user) }
    let!(:bet_two) { create(:bet, user: user) }

    it 'returns bets for the current user' do
      get :index

      expect(json_response.count).to be 2
      expect(json_response.first['game']['id']).to eq bet_one.game.id
    end
  end

  describe 'create' do

    before { game.reload }

    it 'persists a bet to the database' do
      expect do
        post :create, params: {
          bet: {
            price_cents: 1000,
            market: 'fb',
            game_id: game.id,
            team_bet_on_id: game.red_side_team.id
          }
        }
      end.to change(game.bets, :count).by 1

      bet = user.bets.last
      expect(json_response['id']).to be bet.id
      expect(bet.odds).to eq RED_SIDE_ODDS
    end
  end
end
