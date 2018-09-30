require 'rails_helper'

describe Game do
  let!(:blue_side_team) { create(:blue_side_team) }
  let!(:red_side_team) { create(:red_side_team) }
  let!(:game) { 
    create(:game, 
           winner_id: blue_side_team.id, 
           loser_id: red_side_team.id,
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

  let!(:game_4_weeks_ago) { create(:game, date: 4.weeks.ago) }
  let!(:game_3_weeks_ago) { create(:game, date: 3.weeks.ago) }
  let!(:game_2_weeks_ago) { create(:game, date: 2.weeks.ago) }
  let!(:game_1_week_ago)  { create(:game, date: 1.week.ago) }
  let!(:game_tomorrow)    { create(:game, date: 1.day.from_now) }
  let!(:game_1_week_time) { create(:game, date: 1.week.from_now) }
  let!(:game_2_weeks_time) { create(:game, date: 2.weeks.from_now) }

  describe '#most_recently_played' do
    it 'returns the n most recently played games' do
      expect(Game.most_recently_played(2)).to eq([  game_2_weeks_ago, game_1_week_ago ])
    end
  end

  describe '#upcoming_games' do
    it 'returns n upcoming games' do
      expect(Game.upcoming_games(2)).to eq([ game_tomorrow, game_1_week_time ])
    end
  end
end
