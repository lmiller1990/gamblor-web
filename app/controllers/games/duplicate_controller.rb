module Games
  class DuplicateController < ApplicationController
    def create
      game = Game.find(params[:game_id]).dup
      game.game_number = game.game_number += 1

      game.save!

      redirect_to game
    end
  end
end
