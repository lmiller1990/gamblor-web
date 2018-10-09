class Team < ApplicationRecord
  has_many :contracts
  has_many :players, through: :contracts

  def self.find_by_name_case_insensitive(name)
    where('name like ?', name).first
  end

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
