module Api
  module V1
    class MarketsWithEvController < ::ActionController::API
      def index
        last_n_games = params[:last_n_games] ? params[:last_n_games].to_f : nil
        games = Game.all.where('date > ?', DateTime.now).where(winner_id: nil)
        bets = UpcomingMatchEvsService.new(games, last_n_games).call
        render json: bets
      end

      private

      def markets_with_ev_params
        params.permit(:last_n_games)
      end
    end
  end
end
