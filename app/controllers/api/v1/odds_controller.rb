module Api
  module V1
    class OddsController < ::ActionController::API
      def create
        game = UpcomingMatchService.new(odds_params[:blue_side_team], odds_params[:red_side_team]).call
        if game
          odds = UpcomingMatchService.arrange_odds(game.blue_side_team.name.downcase, odds_params)
          attrs = UpcomingMatchService.format_attributes_for_model(odds_params[:market], odds)
          
          game.update_attributes!(attrs)
        else
          render json: { status: 404 }
        end
      end

      private

      def odds_params
        params.permit(
          :blue_side_team,
          :red_side_team,
          :blue_side_team_odds,
          :red_side_team_odds,
          :market
        )
      end
    end
  end
end
