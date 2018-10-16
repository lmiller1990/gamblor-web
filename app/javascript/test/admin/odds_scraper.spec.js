import { processData } from '../../src/admin/odds_scraper.js'

const teamAndOdds =
`team_1,team_2,team_1_odds,team_2_odds
team liquid,kt rolster,4.5,1.16`

describe('processData', () => {
  it('formats data correctly for API', () => {
    const odds = processData('fb', teamAndOdds)

    expect(odds).toHaveLength(1)
    expect(odds[0].t1).toBe('team liquid')
    expect(odds[0].t2).toBe('kt rolster')
    expect(odds[0].t1Odds).toBe(4.5)
    expect(odds[0].t2Odds).toBe(1.16)
    expect(odds[0].market).toBe('fb')
  })
})

