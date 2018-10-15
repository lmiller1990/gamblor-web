class BookkeeperOddsCrawlerService
  def self.scrape_bet365
    system('scripts/all_markets.sh')
  end
end
