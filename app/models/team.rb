class Team < ApplicationRecord
  has_many :contracts
  has_many :players, through: :contracts

  def games
    Game.where(winner_id: id).or(Game.where(loser_id: id))
  end

  def past_players
    contracts.past.map { |x| x.player }
  end

  def current_players
    contracts.ongoing.map { |x| x.player }
  end
end
