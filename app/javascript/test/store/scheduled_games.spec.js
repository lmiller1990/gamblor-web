import { mutations, getters } from '../../src/store/scheduled_games.js'
import { index } from '../fixtures/upcoming_games_api.js'

const createState = () => ({ ids: [], all: {} })

const SUMMER_SPLIT_ID = 1
const SPRING_SPLIT_ID = 2
const summerSplitGame = { splitId: SUMMER_SPLIT_ID }
const springSplitGame = { splitId: SPRING_SPLIT_ID }

const response = [
  { id: 1, blueSideTeamId: 1, splitId: SUMMER_SPLIT_ID },
  { id: 2, blueSideTeamId: 2, splitId: SPRING_SPLIT_ID }
]

describe('mutations', () => {
  describe('SET_GAMES', () => {
    it('sets games and ids', () => {
      const state = createState()

      mutations.SET_GAMES(state, response)

      expect(state.ids).toEqual([1, 2])
      expect(Object.keys(state.all)).toEqual(['1', '2'])
    })
  })
})

describe('getters', () => {
  describe('bySplitId', () => {
    it('returns games by split id', () => {
      const state = createState()
      state.ids = [SUMMER_SPLIT_ID, SPRING_SPLIT_ID]
      state.all = {
        [SUMMER_SPLIT_ID]: summerSplitGame,
        [SPRING_SPLIT_ID]: springSplitGame
      }

      const actual = getters.bySplitId(state)(SUMMER_SPLIT_ID)
      expect(actual).toEqual([SUMMER_SPLIT_ID])
    })
  })

  describe('byTeamId', () => {
    it('returns games by a team id', () => {
      const state = createState()
      state.ids = [1, 2, 3]
      state.all = {
        '1': { blueSideTeamId: 1, redSideTeamId: 2 },
        '2': { blueSideTeamId: 1, redSideTeamId: 3 },
        '3': { blueSideTeamId: 2, redSideTeamId: 4 },
      }

      const actual = getters.byTeamId(state)(1)

      expect(actual).toEqual([ state.all['1'], state.all['2'] ])
    })
  })
})
