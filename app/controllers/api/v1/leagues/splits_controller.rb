module Api
  module V1
    module Leagues
      class SplitsController < ActionController::API
        def index
          render json: Split
            .where(league_id: split_params[:league_id])
            .order(start_date: :asc)
        end

        def show
          render json: Split.find(split_params[:id])
        end

        private

        def split_params
          params.permit(:id, :league_id)
        end
      end
    end
  end
end
