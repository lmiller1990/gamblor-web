require 'rails_helper'

describe Game do
  RED_SIDE_TEAM_ODDS = 1.5
  let!(:blue_side_team) { create(:blue_side_team) }
  let!(:red_side_team) { create(:red_side_team) }
  let!(:game) { 
    create(:game, 
           winner_id: blue_side_team.id, 
           loser_id: red_side_team.id,
           red_side_team_fb_odds: RED_SIDE_TEAM_ODDS,
           first_baron_team_id: red_side_team.id,
           first_blood_team_id: red_side_team.id,
           first_turret_team_id: red_side_team.id,
           first_dragon_team_id: red_side_team.id,
           blue_side_team_id: blue_side_team.id,
           red_side_team_id: red_side_team.id,
           first_turret_type: :top
          ) }

  it 'has a first turret type' do
    expect(game.first_turret_type).to eq "top"
  end

  describe '#winner' do
    it { expect(game.winner).to eq blue_side_team }
  end

  describe '#loser' do
    it { expect(game.loser).to eq red_side_team }
  end
  
  describe '#blue_side_team' do
    it { expect(game.blue_side_team).to eq blue_side_team }
  end

  describe '#red_side_team' do
    it { expect(game.red_side_team).to eq red_side_team }
  end

  describe '#first_team_to_get' do
    it { expect(game.first_team_to_get('dragon')).to eq red_side_team }
    it { expect(game.first_team_to_get('baron')).to eq red_side_team }
    it { expect(game.first_team_to_get('turret')).to eq red_side_team }
    it { expect(game.first_team_to_get('blood')).to eq red_side_team }
  end

  describe '#teams' do
    it { expect(game.teams).to eq [blue_side_team, red_side_team] }
  end

  describe 'validations' do
    describe 'game_number' do
      it 'has a valid game number' do
        game = build(:game, game_number: 1)
        expect(game.valid?).to be true
      end

      it 'is invalid with nil game_number' do
        game = build(:game, game_number: nil)
        expect(game.valid?).to be false
      end

      it 'has an invalid with game number' do
        game = build(:game, game_number: 0)
        expect(game.valid?).to be false
      end
    end
  end

  describe '.complete' do
    it 'returns all completed games' do
      incomplete_game = build(:game, winner_id: nil, loser_id: nil)

      expect(Game.complete).to eq [game]
    end
  end

  describe '#odds_for_team_in_market' do
    it 'returns odds for a market given a team id' do
      actual = game.odds_for_team_in_market(game.red_side_team_id, 'fb')

      expect(actual).to eq RED_SIDE_TEAM_ODDS
    end
  end
end
