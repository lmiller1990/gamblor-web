task :add_split_ids, [] => :environment do |t, args|
  %w(Echo Liquid Solo Clutch Counter Flyquest Cloud Optic 100 Golden).each do |name|
    teams = Team.where('name like ?', "%#{name}%")

    if teams.count == 1
      teams.first.update_attributes!(league_id: 4)
      puts "Updated #{teams.first.name}"
    else 
      puts "error..."
    end
  end
end
