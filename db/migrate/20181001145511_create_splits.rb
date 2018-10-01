class CreateSplits < ActiveRecord::Migration[5.2]
  def change
    create_table :splits do |t|
      t.datetime :start_date
      t.datetime :end_date
      t.references :league, foreign_key: true

      t.timestamps
    end
  end
end
