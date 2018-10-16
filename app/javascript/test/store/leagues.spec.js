import { state, mutations } from '../../src/store/leagues.js'

const createState = () => Object.assign({}, state)

describe('leagues store', () => {
  describe('mutations', () => {
    test('SET_LEAGUES assigns league to state', () => {
      const split = { id: 0, name: 'summer' }
      const league = { splits: [split] }
      const state = createState()

      mutations.SET_LEAGUES(state, { leagues: [league] })

      expect(state.all).toEqual([league])
    })
  })
})
