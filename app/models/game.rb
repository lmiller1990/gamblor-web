class Game < ApplicationRecord
  FIRST_MARKETS = %w(blood turret dragon baron).freeze
  enum first_turret_type: [ :top, :middle, :bottom ]

  belongs_to :league
  belongs_to :split

  validates :game_number, presence: true, numericality: { greater_than_or_equal_to: 1 }

  def self.upcoming_games(num = 5)
    Game
      .where('date >= ?', Date.today)
      .order(date: :asc)[0...num]
  end

  def self.most_recently_played(num = 5)
    Game
      .where('date < ?', Date.today)
      .order(date: :desc)[0...num]
      .reverse
  end

  def winner 
    Team.find winner_id
  end

  def teams
    Team.where(id: [red_side_team_id, blue_side_team_id])
  end

  def loser
    Team.find loser_id
  end

  def red_side_team
    Team.find red_side_team_id
  end

  def blue_side_team
    Team.find blue_side_team_id
  end

  def first_team_to_get(market)
    id = self["first_#{market}_team_id"]
    Team.find id if id
  end

  def player_to_get_first(market)
    id = self["first_#{market}_player_id"]
    Player.find id if id
  end
end
