class AddEvToBet < ActiveRecord::Migration[5.2]
  def change
    add_column :bets, :estimated_value, :float
  end
end
