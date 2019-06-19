require 'rails_helper'

describe Schedule do
  let!(:blue_side_team) { create(:blue_side_team) }
  let!(:red_side_team) { create(:red_side_team) }
  let!(:bo1_g1_5_weeks_ago) { create(:game, date: 5.weeks.ago, winner_id: red_side_team.id, loser_id: blue_side_team.id, match_complete: true) }
  let!(:bo1_g1_4_weeks_ago) { create(:game, date: 4.weeks.ago, winner_id: blue_side_team.id, loser_id: red_side_team.id, match_complete: true) }
  let!(:bo3_g1_3_weeks_ago) { create(:game, date: 3.weeks.ago, winner_id: blue_side_team.id, loser_id: red_side_team.id, match_complete: true) }

  let!(:bo1_g1_next_week) { create(:game, date: 1.week.from_now, winner_id: red_side_team.id, loser_id: blue_side_team.id, match_complete: false) }
  let!(:bo1_g2_next_week) { create(:game, date: 1.week.from_now, winner_id: blue_side_team.id, loser_id: red_side_team.id, game_number: 2) }
  let!(:bo1_g1_two_weeks_time) { create(:game, date: 2.weeks.from_now, winner_id: blue_side_team.id, loser_id: red_side_team.id, match_complete: false) }
  let!(:bo1_g1_three_weeks_time) { create(:game, date: 3.weeks.from_now, winner_id: blue_side_team.id, loser_id: red_side_team.id, match_complete: false) }

  describe 'upcoming_games' do
    it 'returns upcoming matches' do
      expected = [bo1_g1_next_week, bo1_g1_two_weeks_time]
      actual = described_class.upcoming(Game.all, 2)

      expect(actual).to eq(expected)
    end
  end

  describe 'match_overall_result' do
    context 'match is complete' do
      it 'gets the overall winner from a game in a BoX series' do
        g1 = create(:game, match_uuid: 'aaa-bbb', game_number: 1, 
                    blue_side_team_id: blue_side_team.id, 
                    red_side_team_id: red_side_team.id,
                    winner_id: red_side_team.id,
                    loser_id: blue_side_team.id)
        g2 = create(:game, match_uuid: 'aaa-bbb',  game_number: 2, 
                    blue_side_team_id: blue_side_team.id, 
                    red_side_team_id: red_side_team.id,
                    winner_id: blue_side_team.id,
                    loser_id: red_side_team.id)
        g3 = create(:game, match_uuid: 'aaa-bbb', game_number: 3, 
                    blue_side_team_id: blue_side_team.id, 
                    red_side_team_id: red_side_team.id,
                    winner_id: blue_side_team.id,
                    loser_id: red_side_team.id)

        expect(described_class.match_overall_result(g1)).to eq [
          blue_side_team, red_side_team
        ]
      end
    end
  end
end
