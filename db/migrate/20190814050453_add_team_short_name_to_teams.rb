class AddTeamShortNameToTeams < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :short_name, :text
  end
end
