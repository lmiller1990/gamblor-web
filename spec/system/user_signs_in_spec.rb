require 'rails_helper'

describe 'user signs in', type: :system do
  let!(:user) { create(:user) }
  it 'redirects to app after sign in' do
    visit new_user_session_path
    
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password

    click_on 'Log in'

    expect(current_url).to include('app')
  end
end
