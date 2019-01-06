import { state, mutations } from '../../../src/store/user'

const createState = () => Object.assign({}, state)

describe('user store', () => {
  describe('mutations', () => {
    test('SET_ADMIN', () => {
      const state = createState()

      mutations.SET_ADMIN(state, true)

      expect(state.admin).toBe(true)
    })
  })
})
