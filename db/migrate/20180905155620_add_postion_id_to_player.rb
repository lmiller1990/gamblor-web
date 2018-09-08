class AddPostionIdToPlayer < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :position_id, :integer
  end
end
