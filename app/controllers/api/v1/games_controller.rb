module Api
  module V1
    class GamesController < ActionController::API
      def create
        render json: Game.create!(game_params)
      end

      def update
        game = Game.find(params[:id])
        game.update_attributes!(game_params)
      end

      def show
        render json: Game.find(params[:id]).to_json(methods: [:teams])
      end

      private

      def game_params
        params.require(:game).permit(
          :id,
          :first_blood_team_id,
          :first_turret_team_id,
          :winner_id,
          :loser_id,
          :game_number,
          :red_side_team_id,
          :blue_side_team_id,
          :date,
          :league_id,
          :split_id
        )
      end
    end
  end
end
