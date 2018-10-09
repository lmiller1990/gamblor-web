const { readOddsForMarket } = require('../send_odds_to_api.js')

test('readOddsForMarket', () => {
  const odds = readOddsForMarket('test', 'fixtures', 'fb.csv')  

  expect(odds).toHaveLength(1)
  expect(odds[0].t1).toBe('kt rolster')
  expect(odds[0].t2).toBe('team liquid')
  expect(odds[0].t1Odds).toBe(1.5)
  expect(odds[0].t2Odds).toBe(2.5)
})
