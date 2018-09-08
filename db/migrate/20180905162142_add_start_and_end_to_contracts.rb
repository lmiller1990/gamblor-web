class AddStartAndEndToContracts < ActiveRecord::Migration[5.2]
  def change
    add_column :contracts, :start, :datetime, null: false
    add_column :contracts, :end, :datetime
  end
end
