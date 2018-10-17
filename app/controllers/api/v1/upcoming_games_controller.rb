module Api
  module V1
    class UpcomingGamesController < ActionController::API
      def index
        split_id = upcoming_games_params[:split_id]
        games = Split.find(split_id).games

        render json: Schedule.most_recently_played(games, 10) + Schedule.upcoming(games, 6)
      end

      private 

      def upcoming_games_params
        params.permit(:split_id)
      end
    end
  end
end
