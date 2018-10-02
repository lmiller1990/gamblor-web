class AddSplitIdToGame < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :split_id, :integer
  end
end
