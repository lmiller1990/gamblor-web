class AddWinningsOddsToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :blue_side_win_odds, :float
    add_column :games, :red_side_win_odds, :float
  end
end
