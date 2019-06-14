require 'pry'
# This service gets a bet by matchup
# Eg "TSM and CLG for First Blood"
# And show the historical success rates and EV w/ odds!
class MatchupBetSummaryService
  # options: 
  #   team => team we want to be on
  #   to_get => the to_get, eg fb, ft
  #   against => opponent
  #   last_n_games => how many games to consider
  def initialize(options)
    @team = options[:team]
    @against = options[:against]
    @to_get = options[:to_get]
    @last_n_games = options[:last_n_games]
  end

  def get_success_rate(to_get, team)
    mkt = MarketBetMapper.map(@to_get)
    games = team.games.where.not(winner_id: nil).last(@last_n_games)

    count = games.reduce(0) do |acc, curr|
      acc += 1 if curr[mkt] == team.id 
      acc
    end

    count / @last_n_games
  end

  def call
    team_success = get_success_rate(@to_get, @team)
    against_success = get_success_rate(@to_get, @against)
    upcoming_game = Game.upcoming_game_with_teams(@team, @against)

    side = upcoming_game.blue_side_team_id == @team.id ? 'blue' : 'red'
    market = "#{side}_side_team_#{@to_get}_odds"

    ((team_success + (1 - against_success)) / 2.0) * upcoming_game[market]

    {
      team: @team.name,
      against: @against.name,
      to_get: @to_get,
      team_historical_results: [],
      against_historical_results: []
    }
  end
end
