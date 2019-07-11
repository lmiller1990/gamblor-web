require 'securerandom'

class RecommendationsService
  # options is a hash containing:
  # min_ev: the ev must be at least this much to bet. 
  # min_success_percentage_diff: only bet if Team A's success % is at least much greater than Team B's
  # min range is between 0 and 1 (not 0 and 100)
  def initialize(train, test, market, options)
    @train = train
    @test = test
    @market = market
    @options = options
  end

  def call
    get_recommendations(@train, @test, @market, @options)
  end

  private

  def get_recommendations(train, test, market, options)
    min_ev = options[:min_ev]
    min_success_percentage_diff = options[:min_success_percentage_diff]
    recommendations = []

    test.each do |game|
      team_1, team_2, red = game.teams
      blue = game.blue_side_team_id == team_1.id ? team_1 : team_2
      red = blue == team_1 ? team_2 : team_1

      blue_train = train.where(id: blue.games.select { |x| x.id })
      blue_percent = get_success_at_given_date(blue_train, blue, market, game.date)

      red_train = train.where(id: red.games.select { |x| x.id })
      red_percent = get_success_at_given_date(red_train, red, market, game.date)

      blue_odds = game["blue_side_team_#{market}_odds"]
      red_odds = game["red_side_team_#{market}_odds"]

      blue_ev = ((blue_percent + (1 - red_percent)) / 2) * blue_odds
      red_ev = ((red_percent + (1 - blue_percent)) / 2) * red_odds

      diff = min_success_percentage_diff

      if blue_ev > min_ev and (blue_percent - red_percent) > diff
        recommendations << build_recommendation(
          game, blue_ev, blue, red, blue_odds, blue_percent, red_percent, market)
      end

      if red_ev > min_ev and (red_percent - blue_percent) > diff
        recommendations << build_recommendation(
          game, red_ev, red, blue, red_odds, red_percent, blue_percent, market)
      end
    end

    recommendations
  end

  def get_success_at_given_date(team_past_games, team, market, date)
    games = team_past_games.where('date < ?', date)
    success = 0.0

    games.each do |game|
      if game[MarketBetMapper.map(market)] == team.id
        success += 1
      end
    end

    success / games.count
  end

  def build_recommendation(game, ev, team, opponent, odds, team_success, opponent_success, market)
    {
      id: SecureRandom.uuid,
      game: game,
      date: game.date, 
      ev: ev.round(2),
      team: team, 
      market: market,
      team_success: team_success,
      opponent_success: opponent_success,
      odds: odds,
      opponent: opponent
    }
  end

end
