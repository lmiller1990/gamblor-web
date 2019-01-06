import { getters } from '../../../src/store/historical_games'
import { HistoricalGamesState } from '../../../src/store/types'

const createState = (): HistoricalGamesState => ({ ids: [], all: {} })

const GAME_ID_1 = 1
const GAME_ID_2 = 2
const SPLIT_ID_1 = 1
const SPLIT_ID_2 = 2

const data = { redSideTeamId: 1, blueSideTeamId: 2, id: 0, createdAt: new Date(), updatedAt: new Date(), date: new Date() }

describe('historicalGames', () => {
  describe('getters', () => {
    describe('byTeamId', () => {
      it('returns games team participated in and sorts by id', () => {
        const state = createState()
        state.ids = [2, 1, 3]
        state.all = {
          '1': { ...data, blueSideTeamId: 1, redSideTeamId: 2 },
          '2': { ...data, blueSideTeamId: 1, redSideTeamId: 3 },
          '3': { ...data, blueSideTeamId: 2, redSideTeamId: 4 },
        }

        const actual = getters.byTeamId(state)(1)

        // @ts-ignore
        expect(actual).toEqual([ state.all['1'], state.all['2'] ])
      })
    })

    describe('gameIdsbySplitId', () => {
      it('returns game ids given a splitId', () => {
        const state = createState()
        state.ids = [GAME_ID_1, GAME_ID_2]
        state.all = {
          [GAME_ID_1]: { ...data, splitId: SPLIT_ID_1 },
          [GAME_ID_2]: { ...data, splitId: SPLIT_ID_2 }
        }

        const actual = getters.gameIdsbySplitId(state)(SPLIT_ID_1)

        expect(actual).toEqual([GAME_ID_1])
      })
    })
  })
})
