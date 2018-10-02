class Team < ApplicationRecord
  has_many :contracts
  has_many :players, through: :contracts

  def games
    Game.where(red_side_team_id: id).or(Game.where(blue_side_team_id: id))
      .order(date: :asc)
  end

  def past_players
    contracts.past.map { |x| x.player }
  end

  def current_players
    contracts.ongoing.map { |x| x.player }
  end
end
