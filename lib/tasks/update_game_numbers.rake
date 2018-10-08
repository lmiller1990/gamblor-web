require 'securerandom'

task :update_game_numbers => :environment do
  Game.all.each do |game|
    if game.match_uuid.nil?
      game.match_uuid = SecureRandom.uuid
      game.game_number = 1

      begin
        game.save!
      rescue => e
      end
    end
  end
end
