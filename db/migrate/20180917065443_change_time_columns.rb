class ChangeTimeColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :games, :first_dragon_time
    remove_column :games, :first_blood_time
    remove_column :games, :first_turret_time
    remove_column :games, :first_baron_time

    add_column :games, :first_dragon_time, :float
    add_column :games, :first_blood_time, :float
    add_column :games, :first_turret_time, :float
    add_column :games, :first_baron_time, :float
  end
end
