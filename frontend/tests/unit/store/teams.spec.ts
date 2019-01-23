import { mutations, getters } from '../../../src/store/teams'
import { ITeamsState } from '../../../src/store/types'

const createState = (): ITeamsState => ({ ids: [], all: {} })

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

describe('getters', () => {
  describe('nameById', () => {
    it('returns a team name by the id', () => {
      const state: ITeamsState = createState()
      state.all = {
        '1': {
          id: 1,
          name: 'tsm'
        }
      }
      state.ids = [1]

      expect(getters.nameById(state, {}, {}, {})(1)).toBe('tsm')

    })
  })
})
