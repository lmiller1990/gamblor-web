function scrape() {
  ./scripts/all_markets.sh opl
}

function post() {
  node post_games/node/crawlers/createGamesFromCrawledData.js --league "OPL 2019" --split "Split 1" --api https://lcs-tracking.herokuapp.com/api/v1
}

scrape
post
