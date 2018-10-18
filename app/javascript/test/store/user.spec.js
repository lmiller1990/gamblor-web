import { state, mutations } from '../../src/store/user.js'

const createState = () => Object.assign({}, state)

describe('user store', () => {
  describe('mutations', () => {
    test('SET_ADMIN', () => {
      const state = createState()

      mutations.SET_ADMIN(state, { admin: true })

      expect(state.admin).toBe(true)
    })
  })
})
