function scrape() {
  ./scripts/all_markets.sh msi
}

function post() {
  node post_games/node/crawlers/createGamesFromCrawledData.js --league "MSI 2019" --split "All Games" --api https://lcs-tracking.herokuapp.com/api/v1
}

scrape
post
