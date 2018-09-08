class Team < ApplicationRecord
  has_many :contracts
  has_many :players, through: :contracts

  def games
    Game.where(winner_id: id).or(Game.where(loser_id: id))
  end

  def current_players
  end
end
