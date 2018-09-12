require 'rails_helper'

describe 'creates a team', type: :system do

  let!(:user) { create(:user) }

  it 'creates a game' do
    sign_in user

    team_name = 'Team Liquid'

    expect {
      visit new_team_url

      fill_in 'team_name', with: team_name
      click_on 'Create Team'

      expect(page).to have_content team_name

    }.to change { Team.count }.by 1
  end
end
