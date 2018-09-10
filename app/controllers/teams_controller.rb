class TeamsController < ApplicationController
  def index
    @teams = Team.all
  end

  def show
    @team = Team.find(params[:id])
    @current_contracts = @team.contracts.ongoing
    @players = @team.current_players
    @opponents = all_opponents
  end

  def new
    @team = Team.new
  end

  def create
    @team = Team.create!(team_params)

    redirect_to @team
  end

  private

  def all_opponents 
    @team.games.map do |game|
      if game.red_side_team_id == @team.id
        game.blue_side_team
      else
        game.red_side_team
      end
    end.uniq
  end

  def team_params
    params.require(:team).permit(:name)
  end

end
