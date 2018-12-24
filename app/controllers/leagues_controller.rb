class LeaguesController < ApplicationController
  def index
    @leagues = League.all
  end 

  def new
    @league = League.new
    authorize @league
  end

  def create
    @league = League.new(league_params)
    authorize @league

    @league.save!

    redirect_to @league
  end

  def show
    @league = League.find(params[:id])
  end

  def destroy
    @league = League.find(params[:id]).destroy!

    @league.destroy!

    redirect_to leagues_path
  end

  private

  def league_params
    params.require(:league).permit(:name)
  end
end 
