module Api
  module V1
    class UncollectedGamesController < ActionController::API
      def index
        games = Game.all
          .where(winner_id: nil, loser_id: nil)
          .order(:date)

        render json: games
      end
    end
  end
end
