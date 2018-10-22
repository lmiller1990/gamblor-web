require 'rails_helper'

describe 'switches team sides', type: :system do
  let!(:user) { create(:admin) }
  let!(:game) { create(:game, :with_teams) }

  it 'switches blue and red side teams' do
    before_switch = game.dup

    sign_in user
    visit edit_game_url(game.id)
    click_on 'Switch Sides'
    game.reload

    expect(game.red_side_team_id).to be before_switch.red_side_team_id
    expect(game.blue_side_team_id).to be before_switch.blue_side_team_id
  end
end
