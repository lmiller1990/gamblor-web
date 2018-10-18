class AddTeamToWinIdToBets < ActiveRecord::Migration[5.2]
  def change
    add_column :bets, :team_bet_on_id, :integer
  end
end
