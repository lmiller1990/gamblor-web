require 'rails_helper'

describe 'duplicates a game', type: :system do

  let!(:user) { create(:user) }
  let!(:game) { create(:game, :with_teams) }

  it 'creates an article' do
    sign_in user

    expect {
      visit game_url(game.id)
      click_on 'Duplicate'
    }.to change { Game.count }.by 1

    expect(current_path).to eq "/games/#{Game.last.id}"
  end
end
