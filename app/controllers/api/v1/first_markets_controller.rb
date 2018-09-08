module Api
  module V1
    class FirstMarketsController < ::ApplicationController
      def index
        teams = params[:teams]
        games = []
        teams.each do |team|
          games << team.games_played
        end
      end

      private

      def first_markets_params
        params.require(:teams, :markets)
      end
    end
  end
end
