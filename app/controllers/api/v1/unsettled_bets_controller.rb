module Api
  module V1
    class UnsettledBetsController < ::ActionController::API
      before_action :authenticate_user!

      def index
        bets = current_user.bets
          .order(created_at: :desc)
          .where(won: nil)
          .to_json(methods: [:game])

        render json: bets
      end
    end
  end
end
