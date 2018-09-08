module Api
  module V1
    class GamesController < ActionController::API
      def create
        game = Game.create!(game_params)
      end

      def update
        game = Game.find(params[:id])
        game.update_attributes!(game_params)
      end

      private

      def game_params
        params.require(:game).permit(
          :id,
          :first_blood_team_id,
          :first_turret_team_id,
          :winner_id,
          :loser_id,
          :red_side_team_id,
          :blue_side_team_id,
          :date
        )
      end
    end
  end
end
