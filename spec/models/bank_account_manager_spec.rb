require 'rails_helper'

describe BankAccountManager do
  let!(:user) { create(:user) }

  subject { described_class.new(user.bank_account) }

  describe '#credit' do
    it 'increases the balance' do
      expect {
        subject.credit(1000)
      }.to change(user.bank_account, :balance_cents).by 1000 
    end
  end

  describe '#debit' do
    it 'decreases the balance' do
      expect {
        subject.debit(1000)
      }.to change(user.bank_account, :balance_cents).by(-1000)
    end
  end
end
