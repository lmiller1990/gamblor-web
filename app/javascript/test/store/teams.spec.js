import { mutations } from '../../src/store/teams.js'

const createState = () => ({ ids: [], all: {} })

const response = [
  { id: 1, name: 'Cloud 9' },
  { id: 2, name: 'Team Solomid' }
]

describe('mutations', () => {
  describe('SET_TEAMS', () => {
    it('sets teams and ids', () => {
      const state = createState()

      mutations.SET_TEAMS(state, response)

      expect(state.ids).toEqual([1, 2])
      expect(Object.keys(state.all)).toEqual(['1', '2'])
    })
  })
})
