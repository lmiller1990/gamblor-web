require 'rake'
require 'rails_helper'
Rake.application.rake_require "tasks/update_game_completed"

describe "update_game_completed" do
  before { Rake::Task.define_task(:environment) }
  
  let!(:game) { create(:game, match_complete: false) }
  let!(:g2) { create(:game, match_complete: false, game_number: 2) }
  let!(:g3) { create(:game, match_complete: false, game_number: 1, created_at: 1.week.from_now) }

  it 'works' do
    Rake::Task['update_game_completed'].invoke

    game.reload
    g2.reload

    expect(game.match_complete).to be true
    expect(g2.match_complete).to be false
    expect(g3.match_complete).to be false
  end
end
