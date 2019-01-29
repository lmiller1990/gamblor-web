module Api
  module V1
    class GamesController < ActionController::API
      def index
        period_start = params[:start] 
        period_end = params[:end] 
        
        if period_start and period_end
          games = Game.all
            .where('date > ?', period_start)
            .where('date < ?', period_end)
            .to_json(methods: [:teams])

          render json: games
        else
          render json: Game.all
        end
      end

      def create
        render json: Game.create!(game_params)
      end

      def update
        game = Game.find(params[:id])
        game.update_attributes!(game_params)

        # Settle bets if game is complete
        SettleBetsService.new(game).call if game.complete?

        render json: Game.find(params[:id])
      end

      def show
        render json: Game.find(params[:id]).to_json(methods: [:teams])
      end

      private

      def game_params
        params.require(:game).permit(
          :id,
          :first_blood_team_id,
          :first_turret_team_id,
          :first_dragon_team_id,
          :first_baron_team_id,
          :winner_id,
          :loser_id,
          :red_side_team_id,
          :blue_side_team_id,
          :game_number,
          :date,
          :league_id,
          :split_id,

          :blue_side_team_fb_odds, :blue_side_team_ft_odds, 
          :blue_side_team_fd_odds, :blue_side_team_fbaron_odds, 

          :red_side_team_fb_odds, :red_side_team_ft_odds, 
          :red_side_team_fd_odds, :red_side_team_fbaron_odds, 
        )
      end
    end
  end
end
