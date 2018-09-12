require 'rails_helper'

describe 'games#new', type: :system do

  let!(:user) { create(:user) }
  let!(:red_side_team) { create(:red_side_team) }
  let!(:blue_side_team) { create(:blue_side_team) }

  it 'creates a game' do
    sign_in user

    expect {
      visit new_game_url

      fill_in 'game_date', with: '2018/09/07'

      select(blue_side_team.name, from: 'game[blue_side_team_id]') 
      select(red_side_team.name, from: 'game_red_side_team_id') 

      click_on 'Create Game'

      expect(page).to have_content(
        "#{blue_side_team.name} vs #{red_side_team.name}")

    }.to change { Game.count }.by 1
  end
end
