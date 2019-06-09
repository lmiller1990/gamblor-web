class AddHomeLeagueIdToTeams < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :league_id, :integer
  end
end
