require 'rails_helper'

describe Api::V1::BankAccountsController, type: :controller do
  let!(:user) { create(:user) }

  describe '#index' do
    before :each { sign_in user }

    it 'returns current_user bank account' do
      get :index

      expect(json_response['id']).to be user.bank_account.id
    end
  end
end
