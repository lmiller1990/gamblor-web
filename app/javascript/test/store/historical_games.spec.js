import { getters } from '../../src/store/historical_games.js'

const createState = () => ({ ids: [], all: {} })

describe('historicalGames', () => {
  describe('getters', () => {
    describe('byTeamId', () => {
      it('returns games team participated in, in chronological order', () => {
        const state = createState()
        state.ids = [1, 2, 3]
        state.all = {
          '1': { blueSideTeamId: 1, redSideTeamId: 2, date: '2018-08-04T10:00:00.000Z' },
          '2': { blueSideTeamId: 1, redSideTeamId: 3, date: '2017-08-04T10:00:00.000Z' },
          '3': { blueSideTeamId: 2, redSideTeamId: 4 },
        }

        const actual = getters.byTeamId(state)(1)

        expect(actual).toEqual([ state.all['2'], state.all['1'] ])
      })
    })
  })
})
