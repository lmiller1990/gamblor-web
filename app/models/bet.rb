# t.string "market"
# t.bigint "game_id"
# t.bigint "user_id"
# t.boolean "won"
# t.float "odds"

class Bet < ApplicationRecord
  monetize :price_cents

  belongs_to :game
  belongs_to :user

  validates :market, presence: true
end
