require 'rails_helper'

describe 'interacting with a player contract', type: :system do
  let!(:team) { create(:red_side_team) }
  let!(:player) { create(:player) }
  let!(:user) { create(:user) }

  describe 'creates a contract' do
    it 'adds a new contract to an existing player' do
      sign_in user

      expect {
        visit edit_player_url player

        fill_in 'contract_start', with: '2018/01/01'
        select(team.name, from: 'contract_team_id')
        click_on 'Create Contract'

      }.to change { Contract.count }.by 1
    end
  end
end
