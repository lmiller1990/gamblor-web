require 'rake'
require 'rails_helper'
Rake.application.rake_require "tasks/update_game_numbers"

describe "update_game_numbers" do
  before { Rake::Task.define_task(:environment) }
  
  let!(:has_match_uuid) { create(:game, match_uuid: 'asdf') }
  let!(:g1) { create(:game) }
  let!(:g2) { create(:game) }

  it 'works' do
    Rake::Task['update_game_numbers'].invoke

    g1.reload
    g2.reload

    expect(g1.match_uuid).not_to be nil
    expect(g2.game_number).to be 1
    expect(has_match_uuid.match_uuid).to eq 'asdf'
  end
end
