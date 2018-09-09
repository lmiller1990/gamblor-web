class TeamsController < ApplicationController
  def index
    @teams = Team.all
  end

  def show
    @team = Team.find(params[:id])
  end

  def new
    @team = Team.new
  end

  def create
    @team = Team.create!(team_params)

    redirect_to @team
  end

  private

  def team_params
    params.require(:team).permit(:name)
  end
end
