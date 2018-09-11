require 'rails_helper'

describe SubscribersController, type: :controller do
  describe 'POST /create' do
    it 'creates a subscriber' do
      expect {
        post :create, { 
          params: { 
            subscriber: { name: 'Lachlan', email: 'example@test.com' } 
          }
        }
      }.to change { Subscriber.count }.by 1
    end
  end
end
