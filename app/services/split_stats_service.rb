class SplitStatsService
  def initialize(split)
    @split = split
    @markets = [
      ['fb', 'first_blood_team'],
      ['ft', 'first_turret_team'],
      ['fd', 'first_dragon_team'],
      ['fbaron', 'first_baron_team'],
      ['win', 'winner']
    ]
  end

  # returns hash of hashes
  # each has contains a market, and % net profit on betting on 
  # underdog and favorite. So
  # {
  #   :fb => { underdog: 15, favorite: -60 }
  # }
  def call
    defaults = { underdog: 0, favorite: 0 }
    results = { fb: defaults, ft: defaults, fd: defaults, fbaron: defaults, win: defaults }

    games = @split.games

    return results if games.count == 0

    @markets.each do |market|
      market, market_full = market

      bet_on_underdog = 0
      bet_on_fave = 0

      games.each do |game|
        if game["red_side_team_#{market}_odds"] and game["blue_side_team_#{market}_odds"]
          underdog = game["red_side_team_#{market}_odds"] < game["blue_side_team_#{market}_odds"] ? game.blue_side_team : game.red_side_team

          if game["#{market_full}_id"] == underdog.id
            bet_on_fave -= 1

            if game.red_side_team_id == underdog.id
              bet_on_underdog += game["red_side_team_#{market}_odds"] - 1
            elsif game.blue_side_team_id == underdog.id
              bet_on_underdog += game["blue_side_team_#{market}_odds"] - 1
            end
          else
            bet_on_underdog -= 1

            if game.red_side_team_id == underdog.id
              bet_on_fave += game["blue_side_team_#{market}_odds"] - 1
            elsif  game.blue_side_team_id == underdog.id
              bet_on_fave += game["red_side_team_#{market}_odds"] - 1
            end
          end
        end
      end

      results[market.to_sym] = {
        underdog: (bet_on_underdog / games.count) * 100,
        favorite: (bet_on_fave / games.count) * 100,
      }
    end

    results
  end
end