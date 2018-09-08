class AddFirstTimesToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :first_dragon_time, :time
    add_column :games, :first_blood_time, :time
    add_column :games, :first_turret_time, :time
  end
end
