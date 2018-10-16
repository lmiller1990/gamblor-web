import axios from 'axios'
import { keysToSnake } from '../../src/utils.js'

class GameMarketOdds {
  constructor(market, t1, t2, t1Odds, t2Odds) {
    this.t1 = t1
    this.t2 = t2
    this.t1Odds = parseFloat(t1Odds)
    this.t2Odds = parseFloat(t2Odds)
    this.market = market
  }
}

export const postOdds = (odds) => {
  for (const odd of odds) {
    axios.post('/api/v1/odds', keysToSnake({
      blueSideTeam: odd.t1,
      redSideTeam: odd.t2,
      blueSideTeamOdds: odd.t1Odds,
      redSideTeamOdds: odd.t2Odds,
      market: odd.market
    }))
      .then(res => console.log(res))
  }
}

export const processData = (market, teamsAndOdds) => {
  const lines = teamsAndOdds
    .split('\n')
    .slice(1, teamsAndOdds.length-1)

  return lines.map(line => {
    const [t1, t2, t1Odds, t2Odds] = line.split(',')
    return new GameMarketOdds(market, t1, t2, t1Odds, t2Odds)
  })
}
