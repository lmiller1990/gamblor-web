require 'rails_helper'
require_relative '../../app/helpers/game_helper'

describe GameHelper do
  let!(:game) { create(:game, :with_teams) }

  it 'returns the opposing team' do
    opponent = GameHelper.opposing_team(game, game.red_side_team)

    expect(opponent).to eq game.blue_side_team
  end
end
