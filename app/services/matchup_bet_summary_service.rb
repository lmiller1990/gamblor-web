require 'pry'
# This service gets a bet by matchup
# Eg "TSM and CLG for First Blood"
# And show the historical success rates and EV w/ odds!
class MatchupBetSummaryService
  def initialize(team_one, team_two, market, last_n_games)
    @team_one = team_one
    @team_two = team_two
    @market = market # eg fb, ft, fd
    @last_n_games = last_n_games
  end

  def get_success_rate(market, team)
    market = MarketBetMapper.map(@market)
    games = team.games.where.not(winner_id: nil).last(@last_n_games)

    count = games.reduce(0) do |acc, curr|
      acc += 1 if curr[market] == team.id 
      acc
    end
    
      (count / @last_n_games) * 100
  end

  def call
    team_one_success = get_success_rate(@market, @team_one)
    team_two_success = get_success_rate(@market, @team_two)
    upcoming_game = Game.upcoming_game_with_teams(@team_one, @team_two)
    binding.pry
  end
end
