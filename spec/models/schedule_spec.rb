require 'rails_helper'

describe Schedule do
  let!(:team) { create(:team) }
  let!(:bo1_g1_5_weeks_ago) { create(:game, date: 5.weeks.ago, game_number: 1, winner_id: team.id) }
  let!(:bo1_g1_4_weeks_ago) { create(:game, date: 4.weeks.ago, game_number: 1, winner_id: team.id) }
  let!(:bo3_g1_3_weeks_ago) { create(:game, date: 3.weeks.ago, game_number: 1, winner_id: team.id) }
  let!(:bo3_g2_3_weeks_ago) { create(:game, date: 3.weeks.ago, game_number: 2, winner_id: team.id) }
  let!(:bo3_g1_1_week_ago)  { create(:game, date: 1.week.ago, game_number: 1, winner_id: team.id) }
  let!(:bo3_g2_1_week_ago) { create(:game, date: 1.week.ago, game_number: 2, winner_id: team.id) }

  describe 'most_recently_played' do
    it 'returns recently played and upcoming matches' do
      expected = [bo1_g1_4_weeks_ago, bo3_g1_3_weeks_ago, bo3_g1_1_week_ago]

      actual = described_class.most_recently_played(3)

      expect(actual).to eq(expected)
    end
  end

  let!(:bo1_g1_next_week) { create(:game, date: 1.week.from_now, game_number: 1, winner_id: team.id) }
  let!(:bo1_g2_next_week) { create(:game, date: 1.week.from_now, game_number: 2, winner_id: team.id) }
  let!(:bo1_g1_two_weeks_time) { create(:game, date: 2.weeks.from_now, game_number: 1, winner_id: team.id) }
  let!(:bo1_g1_three_weeks_time) { create(:game, date: 3.weeks.from_now, game_number: 1, winner_id: team.id) }

  describe 'upcoming_games' do
    it 'returns upcoming matches' do
      expected = [bo1_g1_next_week, bo1_g1_two_weeks_time]
      actual = described_class.upcoming(2)

      expect(actual).to eq(expected)
    end
  end

  describe 'match_winner' do
    it 'gets the overall winner from a game in a BoX series' do
      blue_side_team = create(:blue_side_team)
      red_side_team = create(:red_side_team)

      g1 = create(:game, match_uuid: 'aaa-bbb', game_number: 1, 
                  blue_side_team_id: blue_side_team.id, 
                  red_side_team_id: red_side_team.id,
                  winner_id: red_side_team.id)
      g2 = create(:game, match_uuid: 'aaa-bbb',  game_number: 2, 
                  blue_side_team_id: blue_side_team.id, 
                  red_side_team_id: red_side_team.id,
                  winner_id: blue_side_team.id)
      g3 = create(:game, match_uuid: 'aaa-bbb', game_number: 3, 
                  blue_side_team_id: blue_side_team.id, 
                  red_side_team_id: red_side_team.id,
                  winner_id: blue_side_team.id)

      expect(described_class.match_winner(g1)).to eq blue_side_team
    end
  end
end
