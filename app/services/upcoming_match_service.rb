class UpcomingMatchService
  # @param {Array} teams - array containing two teams
  def initialize(team_one, team_two)
    @team_one = Team.find_by_name(team_one)
    @team_two = Team.find_by_name(team_two)
  end

  def games_with_teams
    games_for_team_one = @team_one.games.where(game_number: 1)
    games_for_team_two = @team_two.games.where(game_number: 1)

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
