class AddColumnsToBet < ActiveRecord::Migration[5.2]
  def change
    add_column :bets, :market, :string
    add_reference :bets, :game, foreign_key: true
    add_reference :bets, :user, foreign_key: true
    add_column :bets, :won, :boolean
    add_column :bets, :odds, :float
  end
end
