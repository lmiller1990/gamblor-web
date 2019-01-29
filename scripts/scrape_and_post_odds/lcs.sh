function scrape() {
  ./scripts/all_markets.sh lcs
}

function post() {
  node post_games/node/crawlers/createGamesFromCrawledData.js --league "NA LCS 2019" --split "Spring Split" --api https://lcs-tracking.herokuapp.com/api/v1
}

scrape
post

