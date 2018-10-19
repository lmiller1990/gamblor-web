import { state, mutations, getters } from '../../src/store/games.ts'

const createState = () => Object.assign({}, state)

const rootGetters = {
  'teams/nameById': (id) => id === 1 ? 'blue' : 'red'
}

describe('getters', () => {
  describe('titleById', () => {
    it('concatentates two teams to form a game title', () => {
      const state = createState()
      state.ids = [1]
      state.all = { 
        '1': { 
          blueSideTeamId: 1, redSideTeamId: 2
        }
      }

      expect(
        getters.titleById(state, getters, {}, rootGetters)(1)
      ).toBe('blue vs red')
    })
  })
})
