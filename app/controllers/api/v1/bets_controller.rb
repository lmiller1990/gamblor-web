module Api
  module V1
    class BetsController < ::ActionController::API
      before_action :authenticate_user!

      def index
        render json: current_user.bets.to_json(methods: [:game])
      end

      def create 
        bet = current_user.bets.create!(bets_params)

        render json: bet
      end

      private

      def bets_params
        params.require(:bet).permit(
          :price_cents,
          :market,
          :game_id,
          :team_bet_on_id
        )
      end
    end
  end
end
