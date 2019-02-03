function scrape() {
  ./scripts/all_markets.sh tcl
}

function post() {
  node post_games/node/crawlers/createGamesFromCrawledData.js --league "TCL 2019" --split "Winter" --api https://lcs-tracking.herokuapp.com/api/v1
}

scrape
post
