module Api
  module V1
    class BetsController < ::ActionController::API
      before_action :authenticate_user!

      def index
        render json: current_user.bets
          .order(created_at: :desc)
          .to_json(methods: [:game])
      end

      def create 
        game = Game.find(bets_params[:game_id])
        odds = game.odds_for_team_in_market(
          bets_params[:team_bet_on_id].to_i, bets_params[:market])

        bet = current_user.bets.new(bets_params.merge({ odds: odds }))
        BankAccountManager.new(current_user.bank_account).debit(
          bet.price_cents)

        bet.save!

        render json: bet
      end

      private

      def bets_params
        params.require(:bet).permit(
          :price_cents,
          :market,
          :game_id,
          :team_bet_on_id
        )
      end
    end
  end
end
