import { state, mutations } from '../../src/store/modal'

const createState = () => Object.assign({}, state)

describe('modal', () => {
  describe('mutations', () => {
    describe('SET_MODAL', () => {
      it('updates the state', () => {
        const state = createState()

        mutations.SET_MODAL(state, { show: true })

        expect(state.show).toBe(true)
      })
    })
  })
})
