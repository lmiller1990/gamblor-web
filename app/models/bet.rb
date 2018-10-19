class Bet < ApplicationRecord
  monetize :price_cents

  belongs_to :game
  belongs_to :user

  validates :market, presence: true
end
