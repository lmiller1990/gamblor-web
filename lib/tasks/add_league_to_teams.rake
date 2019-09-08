task :add_league_to_teams, [] => :environment do |t, args|
  ActiveRecord::Base.transaction do
    def update_short(team, name)
      puts name
      league = League.where('name like ?', "%" + name + "%").first
      if team and league
        puts "updating #{team.name} to be in #{league.name}"
      else
        puts "did not find team #{team.name}"
      end

      begin
        if team
          team.update_attributes!({ league_id: league.id })
        end
      rescue
        "Failed for team #{name}"
      end
    end

    update_short(Team.where('lower(name) = ?', 'schalke 04').first, 'LEC')
    update_short(Team.where('lower(name) = ?', 'g2 esports').first, 'LEC')
    update_short(Team.where('lower(name) = ?', 'excel esports').first, 'LEC')
    update_short(Team.where('lower(name) = ?', 'rogue').first, 'LEC')
    update_short(Team.where('lower(name) = ?', 'team vitality').first, 'LEC')
    update_short(Team.where('lower(name) = ?', 'splyce').first, 'LEC')
    update_short(Team.where('lower(name) = ?', 'fnatic').first, 'LEC')
    update_short(Team.where('lower(name) = ?', 'origen').first, 'LEC')
    update_short(Team.where('lower(name) = ?', 'misfits').first, 'LEC')
    update_short(Team.where('lower(name) = ?', 'sk gaming').first, 'LEC')

    update_short(Team.where('lower(name) = ?', 'echo fox').first, 'LCS')
    update_short(Team.where('lower(name) = ?', 'counter logic gaming').first, 'LCS')
    update_short(Team.where('lower(name) = ?', '100 thieves').first, 'LCS')
    update_short(Team.where('lower(name) = ?', 'golden guardians').first, 'LCS')
    update_short(Team.where('lower(name) = ?', 'team solomid').first, 'LCS')
    update_short(Team.where('lower(name) = ?', 'team liquid').first, 'LCS')
    update_short(Team.where('lower(name) = ?', 'flyquest').first, 'LCS')
    update_short(Team.where('lower(name) = ?', 'optic gaming').first, 'LCS')
    update_short(Team.where('lower(name) = ?', 'clutch gaming').first, 'LCS')
    update_short(Team.where('lower(name) = ?', 'cloud9').first, 'LCS')
  end
end
