require 'rails_helper'

describe UpcomingMatches do
  let!(:bo1_g1_5_weeks_ago) { create(:game, date: 5.weeks.ago, game_number: 1) }
  let!(:bo1_g1_4_weeks_ago) { create(:game, date: 4.weeks.ago, game_number: 1) }
  let!(:bo3_g1_3_weeks_ago) { create(:game, date: 3.weeks.ago, game_number: 1) }
  let!(:bo3_g2_3_weeks_ago) { create(:game, date: 3.weeks.ago, game_number: 2) }
  let!(:bo3_g1_1_week_ago)  { create(:game, date: 1.week.ago, game_number: 1) }
  let!(:bo3_g2_1_week_ago) { create(:game, date: 1.week.ago, game_number: 2) }

  describe 'most_recently_played' do
    it 'returns recently played and upcoming matches' do
      expected = [bo1_g1_4_weeks_ago, bo3_g1_3_weeks_ago, bo3_g1_1_week_ago]

      actual = described_class.most_recently_played(3)

      expect(actual).to eq(expected)
    end
  end

  let!(:bo1_g1_next_week) { create(:game, date: 1.week.from_now, game_number: 1) }
  let!(:bo1_g2_next_week) { create(:game, date: 1.week.from_now, game_number: 2) }
  let!(:bo1_g1_two_weeks_time) { create(:game, date: 2.weeks.from_now, game_number: 1) }
  let!(:bo1_g1_three_weeks_time) { create(:game, date: 3.weeks.from_now, game_number: 1) }

  describe 'upcoming_games' do
    it 'returns upcoming matches' do
      expected = [bo1_g1_next_week, bo1_g1_two_weeks_time]
      actual = described_class.upcoming(2)

      expect(actual).to eq(expected)
    end
  end
end
