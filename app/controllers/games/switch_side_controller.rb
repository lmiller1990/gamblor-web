module Games
  class SwitchSideController < ApplicationController
    def switch_side
      @game = Game.find(params[:game_id])
      authorize @game
      switched_game = SwitchSidesService.new(@game).call

      redirect_to edit_game_url(@game)
    end

    private

    def switch_side_params
      params.require(:game_id)
    end
  end
end
