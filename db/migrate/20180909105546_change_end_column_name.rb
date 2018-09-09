class ChangeEndColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :contracts, :end, :end_date
  end
end
