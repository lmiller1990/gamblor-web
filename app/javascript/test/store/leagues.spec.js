import { state, mutations, getters } from '../../src/store/leagues.js'

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

  describe('getters', () => {
    it('gets each split in the format [league - split]', () => {
      const state = createState()
      state.all = [{ 
        id: 0, 
        name: 'worlds',
        splits: [
          { id: 1, name: 'playin' },
          { id: 2, name: 'groups' }
        ]
      }]
  
      const actual = getters.splits(state)    

      expect(actual).toEqual([
        { id: 1, name: 'worlds - playin' },
        { id: 2, name: 'worlds - groups' }
      ])
    })
  })
})
