class UpcomingMatchEvsService
  def initialize(games, last_n_games = 15.0)
    @games = games
    @last_n_games = last_n_games
  end

  def call
    markets = %w(fb ft fd fbaron)
    bets = []
    id = 1

    @games.each do |game|
      blue_team = game.blue_side_team
      red_team = game.red_side_team

      blue_games = blue_team.games.where.not(winner_id: nil).last(@last_n_games)
      red_games = red_team.games.where.not(winner_id: nil).last(@last_n_games)

      markets.each do |mkt|
        market = MarketBetMapper.map(mkt)

        team_got_count = blue_games.reduce(0) do |acc, curr| 
          acc += 1 if curr[market] == blue_team.id 
          acc
        end

        other_team_wont_get_count = red_games.reduce(0) do |acc, curr|
          acc += 1 if curr[market] != red_team.id 
          acc
        end
        other_team_got_count = red_games.count - other_team_wont_get_count

        odds = game["blue_side_team_#{mkt}_odds"]
        bet = { 
          :id => id,
          :team => blue_team.name,
          :percentage => (team_got_count / @last_n_games) * 100,
          :opponent_percentage => (other_team_got_count / @last_n_games) * 100,
          :opponent => red_team.name,
          :market => mkt, 
          :odds => odds,
          :ev => (((team_got_count/@last_n_games) + (other_team_wont_get_count/@last_n_games)) / 2) * odds
        }

        id += 1
        bets << bet

        team_got_count = red_games.reduce(0) do |acc, curr| 
          acc += 1 if curr[market] == red_team.id 
          acc
        end

        other_team_wont_get_count = blue_games.reduce(0) do |acc, curr|
          acc += 1 if curr[market] != blue_team.id 
          acc
        end
        other_team_got_count = blue_games.count - other_team_wont_get_count

        odds = game["red_side_team_#{mkt}_odds"]
        bet = { 
          :id => id,
          :team => red_team.name,
          :percentage => (team_got_count / @last_n_games) * 100,
          :opponent_percentage => (other_team_got_count / @last_n_games) * 100,
          :opponent => blue_team.name,
          :market => mkt, 
          :odds => odds,
          :ev => (((team_got_count/@last_n_games) + (other_team_wont_get_count/@last_n_games)) / 2) * odds
        }
        id += 1
        bets << bet
      end
    end

    bets
  end
end
