class Bet < ApplicationRecord
  monetize :price_cents

  belongs_to :game
  belongs_to :user

  validates :market, presence: true

  def teams
    game = Game.find(game_id) 

    "#{game.blue_side_team.name} vs #{game.red_side_team.name}"
  end

  def team_bet_on
    Team.find(team_bet_on_id).name
  end
end
