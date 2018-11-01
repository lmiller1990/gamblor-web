class BankAccountManager
  def initialize(bank_account)
    @bank_account = bank_account
  end

  def credit(amount)
    @bank_account.balance_cents += amount
    @bank_account.save!
  end

  def debit(amount)
    @bank_account.balance_cents -= amount
    @bank_account.save!
  end
end
