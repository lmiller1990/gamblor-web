module Api
  module V1
    module Teams
      class GamesController < ::ActionController::API
        def index
          render json: { 'ok': 'ok' }
        end
      end
    end
  end
end
