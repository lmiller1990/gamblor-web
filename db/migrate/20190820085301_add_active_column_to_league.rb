class AddActiveColumnToLeague < ActiveRecord::Migration[5.2]
  def change
    add_column :leagues, :active, :boolean, default: false, null: false
  end
end
