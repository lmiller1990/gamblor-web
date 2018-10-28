task :update_game_completed => :environment do
  Game.all.each do |game|
    begin
      game.update_attributes(match_complete: true) if game.game_number == 1 and game.created_at < 1.day.from_now
    rescue
      # ...
    end
  end
end
