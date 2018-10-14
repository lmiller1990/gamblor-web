const axios = require('axios')
const fs = require('fs')
const path = require('path')
const snakeCase = require('lodash/snakeCase.js')

const keysToSnake = (obj) => {
  const snakeCased = {}
  for (const k of Object.keys(obj)) {
    snakeCased[snakeCase(k)] = obj[k]
  }

  return snakeCased
}

class GameMarketOdds {
  constructor(market, t1, t2, t1Odds, t2Odds) {
    this.t1 = t1
    this.t2 = t2
    this.t1Odds = parseFloat(t1Odds)
    this.t2Odds = parseFloat(t2Odds)
    this.market = market
  }
}

module.exports.readOddsForMarket = (...filepath) => {
  const odds = []
  const market = filepath[filepath.length-2]
  const data = 
    fs.readFileSync(path.join(__dirname, ...filepath), 'utf8')
    .split('\n')

  const lines = data.slice(1, data.length-1)
  for (const line of lines) {
    const [t1, t2, t1Odds, t2Odds] = line.split(',')
    odds.push(new GameMarketOdds(market, t1, t2, t1Odds, t2Odds))
  }

  return odds
}

module.exports.postOddsToApi = (odds) => {
  for (const odd of odds) {
    axios.post(`http://localhost:3000/api/v1/odds`, keysToSnake({
      blueSideTeam: odd.t1,
      redSideTeam: odd.t2,
      ['blueSideTeamOdds']: odd.t1Odds,
      ['redSideTeamOdds']: odd.t2Odds,
      market: odd.market
    }))
      .then((r) => console.log(r.data.error))
      .catch((e) => console.log(e))
    break
  }
}
