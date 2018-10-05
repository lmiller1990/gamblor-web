module Api
  module V1
    class UpcomingGamesController < ActionController::API
      # returns past 5 games and upcoming 5 games
      # in chronological order, from oldest to most in future
      def index
        render json: Game.most_recently_played(10) + Game.upcoming_games
      end
    end
  end
end
