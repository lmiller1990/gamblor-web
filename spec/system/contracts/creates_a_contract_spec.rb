require 'rails_helper'

describe 'creating a contract', type: :system do
  let!(:position) { create(:position) }
  let!(:player) { create(:player, position: position) }
  let!(:team) { create(:team) }

  it 'creates a contract and redirects team page' do
    expect {
      visit new_contract_url
      
      select team.name, from: 'contract[team_id]'
      select player.name, from: 'contract[player_id]'
      fill_in 'contract[start]', with: '2018/09/07'

      click_on 'Create Contract'

    }.to change { Contract.count }.by 1

    expect(team.players.count).to be 1
    expect(player.teams.count).to be 1
  end
end
