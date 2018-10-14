require 'csv'

module BookkeeperOddsReaderService
  # @param {Array} array of markets. eg: ['fb', 'ft']
  # @param {Array} path to read. eg: ['node', 'odds']
  # @param {String} bookie. eg: bet365
  #
  # @returns {Hash} Hash of markets, each containing array of arrays of odds
  # eg: { :fb => [['team1', 'team2', 't1odds', 't2odds'], ['tsm', 'clg', '1.5', '1']] }
  def self.call(markets, odds_path, bookie)
    odds = {}
    markets.each do |market|
      odds[market.to_sym] = CSV.read(Rails.root.join(*odds_path, market, "#{bookie}.csv"))
    end

    odds
  end
end
