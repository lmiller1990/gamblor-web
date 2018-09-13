import { mutations } from '../../src/store/games.js'

const createState = () => ({ ids: [], all: {} })

const response = [
  { id: 1, blueSideTeamId: 1 },
  { id: 2, blueSideTeamId: 2 },
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
