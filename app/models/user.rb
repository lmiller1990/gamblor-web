class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :bets, dependent: :destroy
  has_one :bank_account, dependent: :destroy

  before_create :create_bank_account

  def create_bank_account
    self.build_bank_account(balance_cents: 100000)
  end
end
