require 'pry'
task :newsletter, [] => :environment do |t, args|
  summary = MatchupBetSummaryService.new(
    team: Team.find_by_name('Flyquest'),
    to_get: 'fbaron',
    against: Team.find_by_name('Team Liquid'),
    last_n_games: 15.0
  ).call

  title = "#{summary[:team]} to get #{MarketBetMapper.prettify(summary[:to_get])} against #{summary[:against]}"
  binding.pry

  body = "<h4>#{title}</h4>"

  File.write('./newsletter.html', body)
end
