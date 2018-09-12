require 'rails_helper'

describe 'games#index', type: :system do
  let!(:game) { create(:game, :with_teams) } 
  let!(:user) { create(:user) }

  it 'visits index and views a game teams' do
    sign_in user

    visit games_url
    
    expect(page).to have_content(game.blue_side_team.name)
    expect(page).to have_content(game.red_side_team.name)
  end
end
