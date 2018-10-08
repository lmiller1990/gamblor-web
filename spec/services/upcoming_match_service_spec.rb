require 'rails_helper'

describe UpcomingMatchService do
  let!(:game) { create(:game, :with_teams, date: Date.yesterday) }
  let!(:random_team) { create(:team) }
  let!(:another_team) { create(:team) }

  let!(:upcoming_game) { 
    create(:game, date: Date.tomorrow,
           red_side_team_id: game.red_side_team.id,
           blue_side_team_id: game.blue_side_team.id) 
  }

  subject {
    described_class.new(game.blue_side_team.name, game.red_side_team.name)
  }


  describe '#call' do
    it 'returns the next game for two teams' do
      expect(subject.call).to eq upcoming_game
    end
  end

  describe '#games_with_teams' do
    it 'returns game with both teams' do
      game_without_teams = create(:game, blue_side_team_id: random_team.id, red_side_team_id: another_team.id)

      expect(subject.games_with_teams).to eq [game, upcoming_game]
    end
  end

  describe '#latest_game' do
    it 'returns the most recent or upcoming game' do
      actual = subject.latest_game([ upcoming_game, game ])

      expect(actual).to eq upcoming_game
    end
  end
end
