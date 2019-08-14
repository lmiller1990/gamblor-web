task :add_short_names, [] => :environment do |t, args|
  ActiveRecord::Base.transaction do
    def update_short(team, name)
      begin
        puts "updating #{name}"
        team.update_attributes!({ short_name: name })
        puts "Updated #{team.name}"
      rescue
        "Failed for team #{short_name}"
      end
    end

    update_short(Team.where('lower(name) = ?', 'schalke 04').first, 's04')
    update_short(Team.where('lower(name) = ?', 'g2 esports').first, 'g2')
    update_short(Team.where('lower(name) = ?', 'excel esports').first, 'xl')
    update_short(Team.where('lower(name) = ?', 'rogue').first, 'rge')
    update_short(Team.where('lower(name) = ?', 'team vitality').first, 'vit')
    update_short(Team.where('lower(name) = ?', 'splyce').first, 'spy')
    update_short(Team.where('lower(name) = ?', 'fnatic').first, 'fnc')
    update_short(Team.where('lower(name) = ?', 'origen').first, 'og')
    update_short(Team.where('lower(name) = ?', 'misfits').first, 'msf')
    update_short(Team.where('lower(name) = ?', 'sk gaming').first, 'sk')

    update_short(Team.where('lower(name) = ?', 'echo fox').first, 'fox')
    update_short(Team.where('lower(name) = ?', 'counter logic gaming').first, 'clg')
    update_short(Team.where('lower(name) = ?', '100 thieves').first, '100')
    update_short(Team.where('lower(name) = ?', 'golden guardians').first, 'ggs')
    update_short(Team.where('lower(name) = ?', 'team solomid').first, 'tsm')
    update_short(Team.where('lower(name) = ?', 'team liquid').first, 'tl')
    update_short(Team.where('lower(name) = ?', 'flyquest').first, 'fly')
    update_short(Team.where('lower(name) = ?', 'optic gaming').first, 'opt')
    update_short(Team.where('lower(name) = ?', 'clutch gaming').first, 'cg')
    update_short(Team.where('lower(name) = ?', 'cloud9').first, 'c9')
  end
end
