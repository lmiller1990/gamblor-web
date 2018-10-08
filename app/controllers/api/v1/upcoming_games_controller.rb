module Api
  module V1
    class UpcomingGamesController < ActionController::API
      def index
        render json: UpcomingMatches.most_recently_played(10) + UpcomingMatches.upcoming(5)
      end
    end
  end
end
