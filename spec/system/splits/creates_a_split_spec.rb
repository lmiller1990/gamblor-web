require 'rails_helper'

describe 'creates a split', type: :system do

  let!(:user) { create(:user) }
  let!(:league) { create(:league) }

  it 'creates a split' do
    sign_in user

    expect {
      visit new_split_url

      select(league.name, from: 'split_league_id')
      fill_in 'split[start_date]', with: '2018/01/01'
      fill_in 'split[end_date]', with: '2018/09/01'
      fill_in 'split[name]', with: 'NA Summer Split'

      click_on 'Create Split'
    }.to change { Split.count }.by 1

    expect(page).to have_content('Split: NA Summer Split')
  end
end
