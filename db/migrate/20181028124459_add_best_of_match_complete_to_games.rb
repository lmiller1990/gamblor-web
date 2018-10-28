class AddBestOfMatchCompleteToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :match_complete, :boolean, default: false, null: false
  end
end
