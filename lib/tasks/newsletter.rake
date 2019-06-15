require 'erb'

task :newsletter, [] => :environment do |t, args|

  desired_summaries = [
    { team_name: 'Counter Logic Gaming', against: 'Echo Fox', to_get: 'fb', last_n_games: 20 },
    { team_name: 'Golden Guardians', against: '100 Thieves', to_get: 'fd', last_n_games: 20 },

    { team_name: 'Cloud9', against: 'Team SoloMid', to_get: 'fd', last_n_games: 20 },
    { team_name: 'Cloud9', against: 'Team SoloMid', to_get: 'fbaron', last_n_games: 20 },
    { team_name: 'Team Liquid', against: 'Optic Gaming', to_get: 'ft', last_n_games: 20 },
    { team_name: 'Clutch Gaming', against: 'Flyquest', to_get: 'fb', last_n_games: 20 },
    { team_name: 'Golden Guardians', against: 'Counter Logic Gaming', to_get: 'fd', last_n_games: 20 },
  ]

  summaries = []
  bet_template = File.read('./app/services/bets_template.html.erb')

  desired_summaries.each do |x|
    summary = MatchupBetSummaryService.new(
      team: Team.find_by_name(x[:team_name]),
      to_get: x[:to_get],
      against: Team.find_by_name(x[:against]),
      last_n_games: x[:last_n_games]
    ).call

    summaries << ERB.new(bet_template).result(binding)
  end

  template = File.read('./app/services/newsletter_template.html.erb')
  output = ERB.new(template).result(binding)
  File.write('./newsletter.html', output)
end
