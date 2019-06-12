class UpcomingMatchEvsService
  def initialize(games)
    @games = games
  end

  def call
    markets = %w(fb ft fd fbaron)
    bets = []

    @games.each do |game|
      blue_team = game.blue_side_team
      red_team = game.red_side_team

      blue_games = blue_team.games.where.not(winner_id: nil).last(15)
      red_games = red_team.games.where.not(winner_id: nil).last(15)

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

        odds = game["blue_side_team_#{mkt}_odds"]
        bet = { 
          :team => blue_team.name,
          :opponent => red_team.name,
          :market => mkt, 
          :odds => odds,
          :ev => (((team_got_count/15.0) + (other_team_wont_get_count/15.0)) / 2) * odds
        }
        # binding.pry
        bets << bet

        team_got_count = red_games.reduce(0) do |acc, curr| 
          acc += 1 if curr[market] == red_team.id 
          acc
        end

        other_team_wont_get_count = blue_games.reduce(0) do |acc, curr|
          acc += 1 if curr[market] != blue_team.id 
          acc
        end

        odds = game["red_side_team_#{mkt}_odds"]
        bet = { 
          :team => red_team.name,
          :opponent => blue_team.name,
          :market => mkt, 
          :odds => odds,
          :ev => (((team_got_count/15.0) + (other_team_wont_get_count/15.0)) / 2) * odds
        }
        bets << bet
      end
    end

    bets
  end
end
