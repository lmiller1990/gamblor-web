class SplitsController < ApplicationController
  def index
  end

  def new
    @split = Split.new
    @leagues = FormHelper.select_for League.all
  end
  
  def create
    @split = Split.new(split_params)

    if @split.save
      redirect_to @split
    else
      render 'new'
    end
  end

  def show
    @split = Split.find params[:id]
  end

  private

  def split_params
    params.require(:split).permit(:league_id, :start_date, :end_date, :name)
  end
end
