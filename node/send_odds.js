const {
  postOddsToApi, 
  readOddsForMarket
} = require('./send_odds_to_api.js')

const markets = ['fb', 'ft', 'fd', 'fbaron', 'win']

for (const market of markets) {
  const data = readOddsForMarket('odds', market, 'bet365.csv')

  postOddsToApi(data)
}
