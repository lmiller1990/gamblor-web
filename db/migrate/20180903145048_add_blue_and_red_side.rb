class AddBlueAndRedSide < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :red_side_team_id, :integer, null: false
    add_column :games, :blue_side_team_id, :integer, null: false
    add_column :games, :first_baron_team_id, :integer
    add_column :games, :first_dragon_team_id, :integer
  end
end
