class PlayersController < ApplicationController
  def new
    @player = Player.new
    @teams = teams
    @positions = positions
  end

  def create
    @player = Player.create!(player_params)
    redirect_to edit_player_url(@player)
  end

  def show
    @player = Player.find(params[:id])
  end

  def index
    @players = Player.all.order(name: :asc)
  end

  def update
    @player = Player.find(params[:id])
    @player.update_attributes!(player_params)
    redirect_to @player
  end

  def edit
    @player = Player.find(params[:id])
    @teams = teams
    @positions = positions
    @new_contract = Contract.new(player: @player)
    @teams = teams
  end

  private

  def player_params 
    params.require(:player).permit(
      :name,
      :position_id,
      :team_id
    )
  end

  def teams
    Team.all.collect {|t| [ t.name, t.id ] }
  end

  def positions
    Position.all.collect {|t| [ t.name, t.id ] }
  end
end
