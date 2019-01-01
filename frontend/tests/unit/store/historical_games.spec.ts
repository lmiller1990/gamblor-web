import { getters } from '@/store/historical_games'

const createState = (): { ids: number[], all: object } => ({ ids: [], all: {} })

const GAME_ID_1 = 1
const GAME_ID_2 = 2
const SPLIT_ID_1 = 1
const SPLIT_ID_2 = 2

describe('historicalGames', () => {
  describe('getters', () => {
    describe('byTeamId', () => {
      it('returns games team participated in and sorts by id', () => {
        const state = createState()
        state.ids = [2, 1, 3]
        state.all = {
          '1': { blueSideTeamId: 1, redSideTeamId: 2 },
          '2': { blueSideTeamId: 1, redSideTeamId: 3 },
          '3': { blueSideTeamId: 2, redSideTeamId: 4 },
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
          [GAME_ID_1]: { splitId: SPLIT_ID_1 },
          [GAME_ID_2]: { splitId: SPLIT_ID_2 }
        }

        const actual = getters.gameIdsbySplitId(state)(SPLIT_ID_1)

        expect(actual).toEqual([GAME_ID_1])
      })
    })
  })
})
