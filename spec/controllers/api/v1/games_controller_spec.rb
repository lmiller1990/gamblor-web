require 'rails_helper'

describe Api::V1::GamesController do
  describe '/POST' do
    let!(:league) { create(:league) }
    let!(:split)  { create(:split)  }

    it 'creates a game' do
      expect {
        post :create, params: {
          game: {
            date: DateTime.now,
            red_side_team_id: 1,
            blue_side_team_id: 2,
            league_id: league.id,
            split_id: split.id,
            game_number: 1
          }
        }
      }.to change(Game, :count).by 1
    end
  end

  describe '/:id' do
    it 'gets a game with teams' do
      game = create(:game, :with_teams)

      get :show, params: { id: game.id }

      expect(json_response['teams'].count).to be 2
    end
  end

  describe '/' do
    context 'start and end params provided' do
      it 'gets games between the specified interval' do
        game_tomorrow = create(:game, :with_teams, date: 1.day.from_now)
        last_week = create(:game, date: 2.week.ago)
        two_weeks_ago = create(:game, date: 2.weeks.ago)

        get :index, params: {
          start: 1.week.ago,
          end: 1.week.from_now,
        }

        expect(json_response[0]['id']).to be game_tomorrow.id
      end
    end

    context 'no params provided' do
      it 'returns all teams' do
        game_tomorrow = create(:game, :with_teams, date: 1.day.from_now)
        last_week = create(:game, date: 2.week.ago)
        two_weeks_ago = create(:game, date: 2.weeks.ago)

        get :index

        expect(json_response.count).to eq 3
      end
    end
  end
end
