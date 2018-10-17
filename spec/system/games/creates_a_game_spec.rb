require 'rails_helper'

describe 'games#new', type: :system do

  let!(:user) { create(:admin) }
  let!(:red_side_team) { create(:red_side_team) }
  let!(:blue_side_team) { create(:blue_side_team) }
  let!(:league) { create(:league, name: 'NA LCS') }
  let!(:split)  { create(:split, name: 'Summer Split', league: league) }

  it 'creates a game' do
    sign_in user

    expect {
      visit new_game_url

      fill_in 'game_date', with: '2018/09/07'
      select(blue_side_team.name, from: 'game[blue_side_team_id]') 
      select(red_side_team.name, from: 'game_red_side_team_id') 
      select league.name, from: 'game_league_id'
      select split.name, from: 'game_split_id'
      fill_in 'game[game_number]', with: '1'

      click_on 'Create Game'

      expect(page).to have_content(
        "#{blue_side_team.name} vs #{red_side_team.name}")

    }.to change { Game.count }.by 1
  end
end
