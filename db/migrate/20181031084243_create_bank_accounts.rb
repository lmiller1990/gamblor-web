class CreateBankAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :bank_accounts do |t|
      t.references :user, foreign_key: true
      t.integer :balance_cents, default: 0

      t.timestamps
    end
  end
end
