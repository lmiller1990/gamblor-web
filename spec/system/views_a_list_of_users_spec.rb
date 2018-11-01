require 'rails_helper'

feature 'views a list of users', type: :system do
  it '/users show a list of all users' do
    user = create(:user) 
    visit users_path

    expect(body).to include(user.email)
  end
end
