module GameHelper
  def self.opposing_team(game, home_team)
    game.teams.where.not(id: home_team.id).first
  end
end
