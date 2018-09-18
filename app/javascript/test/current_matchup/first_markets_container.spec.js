const FirstMarketsContainer = require('../../src/current_matchup/first_markets_container.vue').default

describe('FirstMarketsContainer', () => {
  describe('getAverageForMarket', () => {
    it('returns the running first average', () => {
      const subject = FirstMarketsContainer.methods.getAverageForMarket
      const teamId = 1
      const games = [
        { firstBloodTeamId: 0 },
        { firstBloodTeamId: 1 },
        { firstBloodTeamId: 0 },
        { firstBloodTeamId: 1 }
      ]

      expect(subject.call({ teamId, games }, 'Blood'))
        .toEqual([0, .5, .33, .5])
    })
  })

  describe('generateDataset', () => {
    it('adds a linear x axis to a 1d dataset', () => {
      const data = [1, 1, 0]
      const actual = FirstMarketsContainer.methods.generateDataset(data)

      expect(actual).toEqual([
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 0 }
      ])
    })
  })

  describe('chartId', () => {
    it('returns an id', () => {
      const subject = FirstMarketsContainer.computed.chartId
      expect(subject.call({ side: 'red' })).toBe('red_chart')
    })
  })
})
