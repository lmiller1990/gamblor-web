module Api
  module V1
    module Teams
      class FirstMarketsController < ::ActionController::API
        def index
        end

        def show
          team = Team.find params[:team_id]
          market = "#{params[:id]}_team_id"

          data = team.games.map.with_index do |game, idx|
            { id: game.id, val: game[market.to_sym] == team.id }
          end

          render json: data
        end
      end
    end
  end
end
