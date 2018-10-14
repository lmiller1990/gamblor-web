require 'rails_helper'

describe Api::V1::OddsController do
  let!(:game) { create(:game, :with_teams, :unplayed) }

  describe 'create' do
    it 'receives and updates odds for a game' do
      red_odds = 1.5
      blue_odds = 1.4

      post :create, params: {
        blue_side_team: game.red_side_team.name,
        red_side_team: game.blue_side_team.name,
        blue_side_team_odds: blue_odds,
        red_side_team_odds: red_odds,
        market: 'fb'
      }

      game.reload

      expect(game.blue_side_team_fb_odds).to eq blue_odds
      expect(game.red_side_team_fb_odds).to eq red_odds
    end
  end
end
