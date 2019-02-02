module Api
  module V1
    class SwitchSidesController < ActionController::API
      def update
        game = Game.find(params[:id])
        switched_game = SwitchSidesService.new(game).call

        render json: switched_game
      end
    end
  end
end
