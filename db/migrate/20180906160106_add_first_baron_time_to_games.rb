class AddFirstBaronTimeToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :first_baron_time, :time
  end
end
