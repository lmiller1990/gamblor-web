class ContractsController < ApplicationController
  def index
  end

  def edit
    @contract = Contract.find params[:id]
    @teams = FormHelper.select_for Team.all
    @players = FormHelper.select_for Player.all
  end

  def update
    @contract = Contract.find params[:id]
    @contract.update_attributes!(contract_params)

    redirect_to teams_url, params: { id: params[:team_id] }
  end

  def new 
    @contract = Contract.new
    @teams = FormHelper.select_for Team.all
    @players = FormHelper.select_for Player.all
  end

  def create 
    Contract.create!(contract_params)

    redirect_to :back
  end

  private

  def contract_params
    params.require(:contract).permit(:player_id, :team_id, :start, :end_date)
  end
end
