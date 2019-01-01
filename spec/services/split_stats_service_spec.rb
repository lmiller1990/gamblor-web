require 'rails_helper'

describe SplitStatsService do
  context 'a game exists' do 
    let!(:blue_side_team) { create(:blue_side_team) }
    let!(:red_side_team) { create(:red_side_team) }
    let!(:split) { create(:split) }
    let!(:game) { 
      create(:game, 
            first_turret_team_id: red_side_team.id,
            red_side_team_ft_odds: 1.5,
            blue_side_team_ft_odds: 1.5,
            red_side_team_id: red_side_team.id,
            blue_side_team_id: blue_side_team.id,
            split: split
            ) }

    it 'calculates win/loss % of underdog/favored teams over a split' do
      result = described_class.new(split).call

      expect(result[:ft]).to eq({ underdog: 50.0, favorite: -100 })
    end
  end

  context 'there are no games' do
    let!(:split) { create(:split) }

    it 'returns empty hashes' do
      result = described_class.new(split).call

      expect(result[:ft]).to eq({ underdog: 0, favorite: 0 })
    end
  end
end