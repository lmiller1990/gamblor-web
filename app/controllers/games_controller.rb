require 'securerandom'

class GamesController < ApplicationController
  before_action :set_game, only: [:show, :edit, :update]

  def index
    @games = Game.all.order(date: :asc)
  end

  def new
    @game = Game.new
    authorize @game
    @teams = Team.all.order(name: :asc)
    @league = League.last
    # TODO: don't hard code this?
    @splits = @league.splits
  end

  def show
    authorize @game
    set_first_teams
  end

  def create
    game = Game.new(game_params)
    authorize game
    game.match_uuid = SecureRandom.uuid if game.game_number == 1
    game.save!

    redirect_to edit_game_url(game)
  end

  def edit
    authorize @game
    set_players_for_first
    @teams = FormHelper.select_for(@game.teams)
    @players_for_select = @game.teams.first.players.collect {|t| [ t.name, t.id ] }
  end

  def update
    authorize @game
    @game.update_attributes!(game_params)
    SettleBetsService.new(@game).call if @game.complete?

    redirect_to @game
  end

  private

  # Get the correct list of players based on which team 
  # got the first blood/dragon
  def set_players_for_first
    Game::FIRST_MARKETS.each do |market|
      team_id =  @game["first_#{market}_team_id".to_sym]

      if team_id
        set_players_instance_variable(market, Team.find(team_id).players)
      else 
        set_players_instance_variable(market, @game.teams.first.players)
      end
    end
  end

  def set_players_instance_variable(market, players)
    instance_variable_set(
      "@players_for_first_#{market}", players.collect {|p| [ p.name, p.id ] } 
    )
  end

  # Set the first team for each market dynamically 
  def set_first_teams
    Game::FIRST_MARKETS.each do |market|
      if @game["first_#{market}_team_id".to_sym]
        instance_variable_set(
          "@first_#{market}_team", @game.send("first_team_to_get", market).name)
      end
    end
  end

  def game_params
    params.require(:game).permit(
      :game_number, :match_uuid,

      :blue_side_team_id, :red_side_team_id, :date,
      :blue_side_team_win_odds, :red_side_team_win_odds,

      :blue_side_team_fb_odds, :blue_side_team_ft_odds, 
      :blue_side_team_fd_odds, :blue_side_team_fbaron_odds, 

      :red_side_team_fb_odds, :red_side_team_ft_odds, 
      :red_side_team_fd_odds, :red_side_team_fbaron_odds, 

      :first_blood_team_id, :first_turret_team_id,
      :first_baron_team_id, :first_dragon_team_id,

      :first_turret_type, 
      :first_blood_player_id, :first_turret_player_id,
      :first_baron_player_id, :first_dragon_player_id,

      :first_baron_time, :first_blood_time,
      :first_turret_time, :first_dragon_time,

      :winner_id, :loser_id,

      :league_id, :split_id,

      :match_complete
    )
  end

  def set_game
    @game = Game.find(params[:id])
  end
end
