1. Check the upcoming games. I usually check on bet365.com.au, but you can also use Riot's website.

2. Create a new game. Do so at `https://lcs-tracking.herokuapp.com/admin` and click "New Game". Try to create the games in the correct order they are played in, so the schedule is correct. For now it doesn't matter which team is red/blue.

3. [Scraping] Update the scraper. Where it says:

```sh
function main() {
  compile
  crawl "first blood"   "kespa" "bet365.csv" "fb"
  crawl "first dragon"  "kespa" "bet365.csv" "fd"
  crawl "first tower"   "kespa" "bet365.csv" "ft"
  crawl "first baron"   "kespa" "bet365.csv" "fbaron"
}
```

Change `"kespa"` to the name of the event you want to scrape the odds for from bet365. So for LEC you would put:

```sh
function main() {
  compile
  crawl "first blood"   "LEC" "bet365.csv" "fb"
  crawl "first dragon"  "LEC" "bet365.csv" "fd"
  crawl "first tower"   "LEC" "bet365.csv" "ft"
  crawl "first baron"   "LEC" "bet365.csv" "fbaron"
}
```

Run the scraper with `./scripts/all_markets.sh`. This will scrape the odds into `node/odds/`.

4. Now you have scraped the odds, visit https://lcs-tracking.herokuapp.com/admin/odds_scraper. Paste the odds in for a market, eg first blood is `node/odds/fb/bet365.csv`. Select the correct market from the radio buttons and hit process. If it looks correct, click Post. This saves the odds for you. Refreshing the game we made previously shows that it worked:

5. Repeat for all markets. A quick way to copy the results is `cat node/odds/fb/bet365.csv | pbcopy`.
