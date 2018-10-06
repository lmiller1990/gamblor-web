module Games
  class DuplicateController < ApplicationController
    def create
      game = Game.find(params[:game_id]).dup

      game.save!

      redirect_to game
    end
  end
end
