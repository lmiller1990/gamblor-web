require 'rails_helper'

describe 'creates a player', type: :system do
  
  let!(:position) { create(:position) }

  it 'creates a player' do
    expect {
      visit new_player_url

      fill_in 'player_name', with: 'uzi'
      select position.name, from: 'player[position_id]'

      click_on 'Create Player'
    }.to change { Player.count }.by 1
  end
end
