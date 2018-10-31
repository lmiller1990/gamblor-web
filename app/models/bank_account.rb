class BankAccount < ApplicationRecord
  monetize :balance_cents

  belongs_to :user
end
