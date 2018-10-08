class AddMatchUuidToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :match_uuid, :string
  end
end
