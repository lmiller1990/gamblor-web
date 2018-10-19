module Api
  module V1
    class BetsController < ::ActionController::API
      before_action :authenticate_user!

      def index
        render json: current_user.bets.to_json(methods: [:game])
      end
    end
  end
end
