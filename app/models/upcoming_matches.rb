# In the case of a Bo3/Bo5, we only want the first game.
# The goal is to show which teams will be playing, not
# how many games they played/will play.
module UpcomingMatches
  def self.most_recently_played(num = 5)
    Game
      .where(game_number: 1)
      .where('date < ?', Date.today)
      .order(date: :desc)[0...num]
      .reverse
  end

  def self.upcoming(num = 5)
    Game
      .where(game_number: 1)
      .where('date >= ?', Date.today)
      .order(date: :asc)[0...num]
  end
end
