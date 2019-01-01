module Api
  module V1
    module Splits
      class StatsController < ActionController::API
        def index
          split = Split.find(params[:split_id]) 

          render json: SplitStatsService.new(split).call
        end
      end
    end
  end
end