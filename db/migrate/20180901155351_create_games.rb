class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :first_blood_team_id
      t.integer :first_turret_team_id
      t.datetime :date

      t.timestamps
    end
  end
end
