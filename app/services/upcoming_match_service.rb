class UpcomingMatchService
  # @param {String} team name
  # @param {String} team name
  def initialize(team_one, team_two)
    @logger = Logger.new "#{Rails.root}/log/upcoming_match_logger.log"
    begin
      @team_one = Team.find_by_name_case_insensitive(team_one)
      @team_two = Team.find_by_name_case_insensitive(team_two)
    rescue => e
      @logger.error e
    end
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
    begin
      games = games_with_teams
      game = latest_game(games)
      game
    rescue
      @logger.error "No upcoming game found for #{@team_one.name} and #{@team_two.name}"
    end
  end

  # since different websites list the teams in arbitrary order,
  # it may be necessary to correct the blue/red side.
  # Eg: this app may list C9 as blue and CLG as red,
  # but the API sends the odds in the format 
  # clg,c9,1.2,1.5
  # This will lead to the odds saved in the wrong column
  # param {Hash} odds - { :blue_side_team, :red_side_team, :blue_side_team_fb_odds ... }
  def self.arrange_odds(market, blue_side_team_name, odds)
    if odds[:blue_side_team] != blue_side_team_name
      temp = odds["blue_side_team_#{market}_odds".to_sym]

      odds["blue_side_team_#{market}_odds".to_sym] = 
        odds["red_side_team_#{market}_odds".to_sym]
      odds["red_side_team_#{market}_odds".to_sym] = temp
    end

    odds
  end

  # Format attrs correctly to match game model
  def self.format_attributes_for_model(market, odds)
    {
      "blue_side_team_#{market}_odds".to_sym => odds[:blue_side_team_odds],
      "red_side_team_#{market}_odds".to_sym => odds[:red_side_team_odds]
    }
  end
end
