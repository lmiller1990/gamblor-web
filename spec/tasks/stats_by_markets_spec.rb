require 'rake'
require 'rails_helper'
Rake.application.rake_require 'tasks/stats_by_markets'

describe 'stats_by_markets' do
  before { Rake::Task.define_task(:environment) }

  let!(:league) { create(:league, name: 'World Championship') }
  let!(:game) { create(:game, :with_teams, :with_stats, league: league) }
  
  it 'calculates the odds by market and event' do
    Rake::Task['stats_by_markets'].invoke
  end
end
