module Api
  module V1
    class UpcomingGamesController < ActionController::API
      def index
        games = Game.where('date > ?', 3.days.ago)

        render json: games
      end
    end
  end
end
