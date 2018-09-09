class ContractsController < ApplicationController
  def index
  end

  def new 
    @contract = Contract.new
    @teams = FormHelper.select_for Team.all
    @players = FormHelper.select_for Player.all
  end

  def create 
    Contract.create!(contract_params)

    redirect_to teams_url, params: { id: params[:team_id] }
  end

  private

  def contract_params
    params.require(:contract).permit(:player_id, :team_id, :start, :end)
  end
end
