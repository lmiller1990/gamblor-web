require 'rails_helper'

describe 'subscribers', type: :system, js: true do

  it 'a guest subscribers to the newsletter' do
    expect {
      visit '/'

      fill_in 'subscriber_name', with: 'test user'
      fill_in 'subscriber_email', with: 'test@email.com'
      click_on 'Submit' 

    }.to change { Subscriber.count }.by 1
  end
end
