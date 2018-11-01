module Api
  module V1
    class UpcomingGamesController < ActionController::API
      UPCOMING_DEFAULT = 6
      RECENTLY_PLAYED_DEFAULT = 10

      def index
        split_id = upcoming_games_params[:split_id]
        upcoming = upcoming_count
        recently_played = recently_played_count

        games = Split.find(split_id).games

        render json: Schedule.most_recently_played(games, recently_played) + Schedule.upcoming(games, upcoming)
      end

      private 

      def upcoming_games_params
        params.permit(:split_id, :upcoming, :recently_played)
      end

      def upcoming_count
        params[:upcoming].nil? ? 
          UPCOMING_DEFAULT : 
          params[:upcoming].to_i
      end

      def recently_played_count
        params[:recently_played].nil? ? 
          RECENTLY_PLAYED_DEFAULT : 
          params[:recently_played].to_i
      end
    end
  end
end
