function scrape() {
  ./scripts/all_markets.sh lec
}

function post() {
  node post_games/node/crawlers/createGamesFromCrawledData.js --league "LEC 2019" --split "Spring Split" --api https://lcs-tracking.herokuapp.com/api/v1
}

scrape
post

