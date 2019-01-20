module Games
  class SwitchSideController < ApplicationController
    def switch_side
      @game = Game.find(params[:game_id])
      authorize @game
      @game = switch_red_blue_teams(@game)
      @game.save!

      redirect_to edit_game_url(@game)
    end

    private

    def switch_red_blue_teams(game)
      temp = game.dup
      attrs_to_swap = %w(id fb_odds fd_odds ft_odds fbaron_odds win_odds)

      attrs_to_swap.each do |attr|
        game["red_side_team_#{attr}"] = game["blue_side_team_#{attr}"]
        game["blue_side_team_#{attr}"] = temp["red_side_team_#{attr}"]
      end

      game
    end

    def switch_side_params
      params.require(:game_id)
    end
  end
end
