class AddPriceCentsToBet < ActiveRecord::Migration[5.2]
  def change
    add_column :bets, :price_cents, :integer
  end
end
