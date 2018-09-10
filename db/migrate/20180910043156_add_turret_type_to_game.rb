class AddTurretTypeToGame < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :first_turret_type, :integer
  end
end
