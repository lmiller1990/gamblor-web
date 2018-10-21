import { state, mutations, getters } from '../../src/store/bets'

const createState = () => Object.assign({}, state)

const ID = 1
const PRICE_CENTS = 1000

const mockMath = Object.create(global.Math)
global.Math = mockMath

describe('bets', () => {
  describe('mutations', () => {
    test('ADD_BET adds a new bet', () => {
      const state = createState()
      const bet = { id: ID, priceCents: PRICE_CENTS }

      mutations.ADD_BET(state, { bet })

      expect(state).toEqual({
        ids: [ID],
        all: {
          [ID]: { id: ID, priceCents: PRICE_CENTS }
        }
      })
    })
  })

  describe('getters', () => {
    describe('persistedBetIds', () => {
      it('returns bets with positive ids', () => {
        const state = createState()
        state.ids = [-1, 1]

        expect(getters.persistedBetIds(state)).toEqual([1])
      })
    })

    describe('tentativeBetIds', () => {
      it('returns bets with negative ids', () => {
        const state = createState()
        state.ids = [-1, 1]

        expect(getters.tentativeBetIds(state)).toEqual([-1])
      })
    })

    describe('unusedId', () => {
      it('returns an id not already used', () => {
        const state = createState()
        state.ids = [1, 2]

        expect(getters.unusedId(state)).toBe(3)
      })
    })
  })
})

