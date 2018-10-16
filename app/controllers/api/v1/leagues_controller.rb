module Api
  module V1
    class LeaguesController < ActionController::API
      def index
        render json: League.all.as_json(methods: [:splits])
      end
    end
  end
end
