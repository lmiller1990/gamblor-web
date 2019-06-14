task :newsletter, [] => :environment do |t, args|
  fq = Team.find_by_name('Flyquest')
  tl = Team.find_by_name('Team Liquid')
  newsletter = MatchupBetSummaryService.new(
    fq,
    tl,
    'ft',
    15.0
  ).call
end
