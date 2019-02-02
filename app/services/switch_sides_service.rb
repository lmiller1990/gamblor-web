class SwitchSidesService
  def initialize(game)
    @game = game
  end

  def call
    updated_game = switch_red_blue_teams(@game)
    updated_game.save!

    updated_game
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
end
