module Api
  module V1
    module Leagues
      class SplitsController < ActionController::API
        def index
          render json: Split
            .where(league_id: params[:league_id])
            .order(start_date: :asc)
        end
      end
    end
  end
end
