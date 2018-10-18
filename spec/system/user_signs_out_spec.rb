require 'rails_helper'

describe 'user signs out', type: :system, js: true do
  let!(:user) { create(:user) }

  feature 'users signs out' do
    it 'signs out of app and redirects to root' do
      sign_in user

      visit app_index_path
      click_on 'Sign out'
      sleep 1

      expect(root_path).to eql '/'
    end
  end
end
