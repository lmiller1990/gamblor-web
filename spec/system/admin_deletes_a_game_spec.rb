require 'rails_helper'

feature 'deletes a game', type: :system do
  let!(:admin) { create(:admin) }
  let!(:game) { create(:game, :with_teams) }

  it 'an admin user deletes a game' do
    expect do
      sign_in admin
      visit edit_game_url(game)
      click_on 'Delete'

      expect(page).to have_content('All Games')
    end.to change(Game, :count).by(-1)
  end
end
