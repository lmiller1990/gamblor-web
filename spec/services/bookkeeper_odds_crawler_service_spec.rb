require_relative '../../app/services/bookkeeper_odds_crawler_service'

describe BookkeeperOddsCrawlerService do
  describe '.scrape_bet365' do
    it 'executes a bash script' do
      expect(described_class).to receive(:system).with('scripts/all_markets.sh')

      described_class.scrape_bet365
    end
  end
end
