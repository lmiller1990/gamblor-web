# In the case of a Bo3/Bo5, we only want the first game.
# The goal is to show which teams will be playing, not
# how many games they played/will play.
module Schedule
  def self.most_recently_played(games, num = 5)
    games = games
      .where(game_number: 1)
      .where('date < ?', Date.today)
      .order(date: :desc)[0...num]
      .reverse

    games.each do |game|
      if game.winner_id && game.loser_id
        winner, loser = match_overall_result(game)
        game.winner_id = winner.id
        game.loser_id = loser.id
      end
    end

    games
  end

  def self.upcoming(games, num = 5)
    games = games
      .where(game_number: 1)
      .where('date >= ?', Date.today)
      .order(date: :asc, created_at: :asc)[0...num]

    games.each do |game|
      if game.winner_id && game.loser_id
        winner, loser = match_overall_result(game)
        game.winner_id = winner.id
        game.loser_id = loser.id
      end
    end

    games
  end

  # given a game, check if it is part of a Bo3/Bo5.
  # If so, get the eventual overall winner/loser.
  def self.match_overall_result(game)
    games_in_match = Game.where(match_uuid: game.match_uuid)

    if games_in_match.count > 1 
      winner_ids = games_in_match.collect { |x| x.winner_id }
      winner_id = winner_ids.max_by { |x| winner_ids.count(x) }
      # loser id is the other team
      loser_id = winner_id == game.red_side_team_id ? game.blue_side_team_id : game.red_side_team_id

      [Team.find(winner_id), Team.find(loser_id)]
    else
      [game.winner, game.loser]
    end
  end
end
