class AddOddsToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :red_side_team_fb_odds, :float
    add_column :games, :red_side_team_ft_odds, :float
    add_column :games, :red_side_team_fd_odds, :float
    add_column :games, :red_side_team_fbaron_odds, :float
    add_column :games, :red_side_team_win_odds, :float
    add_column :games, :blue_side_team_fb_odds, :float
    add_column :games, :blue_side_team_ft_odds, :float
    add_column :games, :blue_side_team_fd_odds, :float
    add_column :games, :blue_side_team_fbaron_odds, :float
    add_column :games, :blue_side_team_win_odds, :float
  end
end
