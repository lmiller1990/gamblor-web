require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is created with a bank account' do
    user = create(:user)

    expect(user.bank_account).to be_an_instance_of(BankAccount)
  end
end
