module Api
  module V1
    class UpcomingGamesController < ActionController::API
      # returns past 5 games and upcoming 5 games
      # in chronological order, from oldest to most in future
      def index
        render json: UpcomingMatches.most_recently_played(10) + UpcomingMatches.upcoming(5)
      end
    end
  end
end
