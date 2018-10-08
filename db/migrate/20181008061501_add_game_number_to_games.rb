class AddGameNumberToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :game_number, :integer
  end
end
