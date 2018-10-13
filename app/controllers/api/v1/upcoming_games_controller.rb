module Api
  module V1
    class UpcomingGamesController < ActionController::API
      def index
        render json: Schedule.most_recently_played(10) + Schedule.upcoming(6)
      end
    end
  end
end
