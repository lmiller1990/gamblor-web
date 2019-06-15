require 'pry'
require 'erb'

task :newsletter, [] => :environment do |t, args|
  summary = MatchupBetSummaryService.new(
    team: Team.find_by_name('Flyquest'),
    to_get: 'fbaron',
    against: Team.find_by_name('Team Liquid'),
    last_n_games: 15.0
  ).call

  template = File.read('./app/services/newsletter_template.html')
  output = ERB.new(template).result(binding)
  File.write('./newsletter.html', output)
end
