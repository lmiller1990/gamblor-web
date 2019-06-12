module Api
  module V1
    class MarketsWithEvController < ::ActionController::API
      def index
        games = Game.all.where('date > ?', DateTime.now).where(winner_id: nil)
        bets = UpcomingMatchEvsService.new(games).call
        render json: bets
      end
    end
  end
end
