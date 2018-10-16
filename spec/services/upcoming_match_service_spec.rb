require 'rails_helper'

describe UpcomingMatchService do
  let!(:game) { create(:game, :with_teams, date: Date.yesterday, winner_id: nil, loser_id: nil) }
  let!(:random_team) { create(:team) }
  let!(:another_team) { create(:team) }

  let!(:todays_game) { 
    create(:game, date: Date.today,
           red_side_team_id: game.red_side_team.id,
           blue_side_team_id: game.blue_side_team.id,
           winner_id: game.red_side_team.id) 
  }
  let!(:upcoming_game) { 
    create(:game, date: Date.tomorrow,
           red_side_team_id: game.red_side_team.id,
           blue_side_team_id: game.blue_side_team.id,
           winner_id: nil,
           loser_id: nil) 
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

  describe '#arrange_odds' do
    it 'reverses the red/blue team/odds if incorrect' do
      blue_odds = 1.5
      red_odds = 2.5
      market = 'fb'
      odds = {
        blue_side_team: game.red_side_team.name.downcase,
        blue_side_team_odds: red_odds,
        red_side_team: game.blue_side_team.name.downcase,
        red_side_team_odds: blue_odds,
        market: market
      }

      actual = described_class.arrange_odds(
        game.blue_side_team.name.downcase, odds)
  
      expect(actual[:red_side_team_odds]).to eq(red_odds)
      expect(actual[:red_side_team]).to eq(game.red_side_team.name.downcase)

      expect(actual[:blue_side_team_odds]).to eq(blue_odds)
      expect(actual[:blue_side_team]).to eq(game.blue_side_team.name.downcase)
    end
  end
end
