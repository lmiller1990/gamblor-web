class AddPayoutToBets < ActiveRecord::Migration[5.2]
  def change
    add_column :bets, :payout_cents, :integer
  end
end
