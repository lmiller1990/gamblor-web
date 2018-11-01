task :create_accounts_for_users => :environment do
  User.all.each do |user|
    if user.bank_account.nil?
      bank_account = BankAccount.new(balance_cents: 100000)

      user.bank_account = bank_account
    end
  end
end
