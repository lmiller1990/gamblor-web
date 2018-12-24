require 'rails_helper'

describe 'creating a league', type: :system do

  let!(:user) { create(:user) }
  let!(:admin) { create(:admin) }

  describe 'user create a league' do
    context 'admin' do
      it 'disallows' do
        sign_in admin

        expect do

          visit new_league_url

          fill_in 'league_name', with: 'New league'
          click_on 'Create League' 

        end.to change { League.count }.by 1
      end
    end
  end
end
