module Api
  module V1
    module Games
      class DuplicateController < ActionController::API
        def create
          game = Game.find params[:game_id].dup
          game.update_attributes!(
            game_number: game.game_number + 1,
            first_blood_team_id: nil,
            first_turret_team_id: nil,
            first_dragon_team_id: nil,
            first_baron_team_id: nil,
            winner_id: nil,
            loser_id: nil
          )

          render json: game
        end
      end
    end
  end
end
