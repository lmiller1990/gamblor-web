require 'rake'
require 'rails_helper'
Rake.application.rake_require 'tasks/stats_by_markets'

describe 'stats_by_markets' do
  event_name = 'World Championship'
  market = 'fb'
  market_full = 'first_blood_team'

  before { Rake::Task.define_task(:environment) }

  let!(:red_team) { create(:red_side_team) }
  let!(:blue_team) { create(:blue_side_team) }
  let!(:league) { create(:league, name: event_name) }
  let!(:game) { 
    create(:game,
           league: league,
           red_side_team_id: red_team.id,
           blue_side_team_id: blue_team.id,
           red_side_team_fb_odds: 1.5,
           blue_side_team_fb_odds: 2.5,
           first_blood_team_id: blue_team.id) 
  }
  
  it 'calculates the odds by market and event' do
    Rake::Task['stats_by_markets'].invoke [ event_name, market, market_full ]
  end
end
