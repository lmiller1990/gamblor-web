const {
  postOddsToApi, 
  readOddsForMarket
} = require('./send_odds_to_api.js')

const markets = ['fb', 'ft', 'fd', 'fbaron']

for (const market of markets) {
  if (market === 'fb') {
    const data = readOddsForMarket('odds', market, 'bet365.csv')
    postOddsToApi(data)
  }
}
  /*
const odds = [{
  t1: 'team liquid',
  t2: 'mad team',
  t1Odds: 1.0,
  t2Odds: 1.0
}]*/

// postOddsToApi(odds)
