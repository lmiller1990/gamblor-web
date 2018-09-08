class AddFirstPlayerIdsToGame < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :first_turret_player_id, :integer
    add_column :games, :first_dragon_player_id, :integer
    add_column :games, :first_baron_player_id, :integer
    add_column :games, :first_blood_player_id, :integer
  end
end
