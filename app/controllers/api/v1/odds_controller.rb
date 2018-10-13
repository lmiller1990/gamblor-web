module Api
  module V1
    class OddsController < ::ActionController::API
      def create
        game = UpcomingMatchService.new(
          odds_params[:blue_side_team],
          odds_params[:red_side_team]
        ).call

        odds = odds_params.except(:blue_side_team, :red_side_team)
        game.update_attributes!(odds)
      end

      private

      def odds_params
        params.permit(
          :blue_side_team,
          :red_side_team,
          :blue_side_team_fb_odds,
          :blue_side_team_ft_odds,
          :blue_side_team_fd_odds,
          :blue_side_team_fbaron_odds,
          :blue_side_team_win_odds,
          :red_side_team_fb_odds,
          :red_side_team_ft_odds,
          :red_side_team_fd_odds,
          :red_side_team_fbaron_odds,
          :red_side_team_win_odds
        )
      end
    end
  end
end
