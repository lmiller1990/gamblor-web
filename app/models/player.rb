class Player < ApplicationRecord
  has_many :contracts
  has_many :teams, through: :contracts
  belongs_to :position

  def current_team
    contracts.order(start: :desc).first.team
  end
end
