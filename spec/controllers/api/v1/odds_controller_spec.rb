require 'rails_helper'

describe Api::V1::OddsController do
  let!(:game) { create(:game, :with_teams) }

  describe 'create' do
    it 'receives and updates odds for a game' do
      fb_odds = 1.5
      fbaron_odds = 1.4
      win_odds = 1.1

      post :create, params: {
        blue_side_team: game.blue_side_team.name,
        red_side_team: game.blue_side_team.name,
        blue_side_team_fb_odds: fb_odds,
        red_side_team_fbaron_odds: fbaron_odds,
        blue_side_team_win_odds: win_odds
      }

      game.reload

      expect(game.blue_side_team_fb_odds).to eq fb_odds
      expect(game.red_side_team_fbaron_odds).to eq fbaron_odds
      expect(game.blue_side_team_win_odds).to eq win_odds
    end
  end
end
