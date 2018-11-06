class AddFirstRiftHerald < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :first_herald_team_id, :integer
    add_column :games, :fh_odds, :float
    add_column :games, :blue_side_team_fh_odds, :float
    add_column :games, :red_side_team_fh_odds, :float
  end
end
