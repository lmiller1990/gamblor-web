import { state, mutations, getters } from '../../src/store/bets'

const createState = () => Object.assign({}, state)
const context = describe

const ID = 1
const PRICE_CENTS = 1000

const mockMath = Object.create(global.Math)
global.Math = mockMath

describe('bets', () => {
  describe('mutations', () => {
    test('CANCEL removes a bet', () => {
      const state = createState()
      state.ids = [ID]
      state.all = { [ID]: {} }

      mutations.CANCEL(state, { id: ID })

      expect(state.ids).toEqual([])
      expect(state.all).toEqual({})
    })

    test('MOVE_TENTATIVE_BET_TO_CONFIRMED updates the id of a tentative bet', () => {
      const state = createState()
      state.ids = [-1]
      state.all = { '-1': { priceCents: PRICE_CENTS } }
      const persistedBet = { id: 1, priceCents: PRICE_CENTS }

      mutations.MOVE_TENTATIVE_BET_TO_CONFIRMED(
        state, { tentativeId: -1, bet: persistedBet })

      expect(state.ids).toEqual([1])
      expect(state.all).toEqual({ '1': {...persistedBet} })

    }) 

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
      context('state.ids is empty', () => {
        it('returns 1', () => {
          const state = createState()
          state.ids = []

          expect(getters.unusedId(state)).toBe(1)
        })
      })

      context('state.ids is not empty', () => {
        it('returns id one larger than absolute largest', () => {
          const state = createState()
          state.ids = [-1, -2, 0]

          expect(getters.unusedId(state)).toBe(3)
        })
      })
    })
  })
})

