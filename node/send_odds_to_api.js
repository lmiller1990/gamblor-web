const axios = require('axios')
const fs = require('fs')
const path = require('path')

class GameOdds {
  constructor(t1, t2, t1Odds, t2Odds) {
    this.t1 = t1
    this.t2 = t2
    this.t1Odds = parseFloat(t1Odds)
    this.t2Odds = parseFloat(t2Odds)
  }
}

module.exports.readOddsForMarket = (...filepath) => {
  const odds = []
  const data = 
    fs.readFileSync(path.join(__dirname, ...filepath), 'utf8')
    .split('\n')

  const lines = data.slice(1, data.length-1)
  for (const line of lines) {
    const [t1, t2, t1Odds, t2Odds] = line.split(',')
    odds.push(new GameOdds(t1, t2, t1Odds, t2Odds))
  }

  return odds
}

module.exports.postOddsToApi = (odds) => {
  for (const odd of odds) {
    axios.post(`http://localhost:3000/api/v1/odds`, {
      blueSideTeam: odds.t1,
      redSideTeam: odds.t2,
      blueSideTeamFbOdds: odds.t1Odds,
      redSideTeamFbOdds: odds.t2Odds
    })
      .then(() => console.log('ok'))
  }
}
