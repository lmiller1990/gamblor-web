class UpcomingMatchService
  # @param {String} team name
  # @param {String} team name
  def initialize(team_one, team_two)
    @team_one = Team.find_by_name_case_insensitive(team_one)
    @team_two = Team.find_by_name_case_insensitive(team_two)
  end

  def games_with_teams
    games_for_team_one = @team_one.games.where(game_number: 1).where(winner_id: nil).where(loser_id: nil)
    games_for_team_two = @team_two.games.where(game_number: 1).where(winner_id: nil).where(loser_id: nil)

    games_for_team_one & games_for_team_two
  end

  def latest_game(games)
    games.sort_by { |x| x.date }.last
  end

  def call
    games = games_with_teams
    latest_game(games)
  end
end
