require 'rails_helper'

describe Api::V1::SwitchSidesController, type: :controller do
  let!(:admin) { create(:admin) }
  let!(:game) { create(:game, :with_teams) }

  attrs_to_swap = %w(id fb_odds fd_odds ft_odds fbaron_odds win_odds)
  blue_odds = 1.5
  red_odds = 2
  blue_id = 1
  red_id = 2

  describe 'PUT /:id' do

    before do
      sign_in admin

      attrs_to_swap.each do |attr|
        attrs_to_swap = %w(id fb_odds fd_odds ft_odds fbaron_odds win_odds)

        attrs_to_swap.each do |attr|
          game["red_side_team_#{attr}"] = red_odds
          game["blue_side_team_#{attr}"] = blue_odds
        end
      end
      game.save!
    end

    it 'switches red and blue side team id' do
      put :update, params: { id: game.id }

      game.reload

      expect(game.red_side_team_id).to eq blue_id
      expect(game.red_side_team_win_odds).to eq blue_odds

      attrs_to_swap.each do |attr|
        attrs_to_swap = %w(fb_odds fd_odds ft_odds fbaron_odds win_odds)

        attrs_to_swap.each do |attr|
          expect(json_response["red_side_team_#{attr}"]).to eq blue_odds
          expect(json_response["blue_side_team_#{attr}"]).to eq red_odds
        end
      end
    end
  end
end
