function scrape() {
  ./scripts/all_markets.sh cblol
}

function post() {
  node post_games/node/crawlers/createGamesFromCrawledData.js --league "CBLOL" --split "Stage 1" --api https://lcs-tracking.herokuapp.com/api/v1
}

scrape
post
