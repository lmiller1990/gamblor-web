class CreateContracts < ActiveRecord::Migration[5.2]
  def change
    create_table :contracts do |t|
      t.belongs_to :player, index: true
      t.belongs_to :team, index: true

      t.timestamps
    end
  end
end
