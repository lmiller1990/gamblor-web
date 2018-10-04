class AddOddsToGame < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :fb_odds, :float
    add_column :games, :ft_odds, :float
    add_column :games, :fd_odds, :float
    add_column :games, :fbaron_odds, :float
  end
end
