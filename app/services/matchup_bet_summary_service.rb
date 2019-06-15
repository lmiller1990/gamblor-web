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

  def get_success_rate(to_get, team, games)
    mkt = MarketBetMapper.map(@to_get)

    count = games.reduce(0) do |acc, curr|
      acc += 1 if curr[mkt] == team.id 
      acc
    end

    count / @last_n_games
  end

  def get_historical_success(team, games)
  end

  def call
    market_id = MarketBetMapper.map(@to_get) # eg first_blood_team_id

    games = @team.games.where.not(winner_id: nil).last(@last_n_games)
    team_success = get_success_rate(@to_get, @team, games)
    team_historical_results = games.map do |game| 
      { 
        success: game[market_id] == @team.id,
        opponent: game.red_side_team.id == @team.id ? game.blue_side_team.name : game.red_side_team.name,
        date: game.date
      }
    end

    games = @against.games.where.not(winner_id: nil).last(@last_n_games)
    against_success = get_success_rate(@to_get, @against, games)
    against_historical_results = games.map do |game| 
      { 
        success: game[market_id] == @against.id,
        opponent: game.red_side_team.id == @against.id ? game.blue_side_team.name : game.red_side_team.name,
        date: game.date
      }
    end

    upcoming_game = Game.upcoming_game_with_teams(@team, @against)

    side = upcoming_game.blue_side_team_id == @team.id ? 'blue' : 'red'
    odds = "#{side}_side_team_#{@to_get}_odds"

    ev = ((team_success + (1 - against_success)) / 2.0) * upcoming_game[odds]

    {
      team: @team.name,
      against: @against.name,
      ev: ev,
      odds: upcoming_game[odds],
      pretty_market: MarketBetMapper.prettify(@to_get),
      to_get: @to_get,
      team_historical_results: team_historical_results,
      against_historical_results: against_historical_results
    }
  end
end
