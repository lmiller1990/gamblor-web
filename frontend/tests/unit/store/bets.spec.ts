import { state, mutations, getters } from '@/store/bets'

const createState = () => Object.assign({}, state)
const context = describe

const ID = 1
const ANOTHER_ID = 2
const GAME_ID = 1
const PRICE_CENTS = 1000
const BET = { id: ID }

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

    test('ADD_BET adds a new bet to front of array', () => {
      const state = createState()
      state.ids = [ANOTHER_ID]
      state.all = { 
        [ANOTHER_ID]: { id: ANOTHER_ID, priceCents: PRICE_CENTS } 
      }
      const bet = { id: ID, priceCents: PRICE_CENTS }

      mutations.ADD_BET(state, { bet })

      expect(state.ids).toEqual([ID, ANOTHER_ID])
      expect(state.all[ID]).toEqual({ id: ID, priceCents: PRICE_CENTS })
    })
  })

  describe('getters', () => {
    describe('selected', () => {
      it('returns currently selected bet', () => {
        const state = createState()
        state.ids = [ID]
        state.selectedId = ID
        state.all = { [ID]: BET }

        expect(getters.selected(state)).toBe(BET)
      })
    })

    describe('persistedBetIds', () => {
      it('returns bets with positive ids', () => {
        const state = createState()
        state.ids = [-1, 1]

        expect(getters.persistedBetIds(state)).toEqual([1])
      })
    })

    describe('gameIdsForAllBets', () => {
      it('returns gameIds for all bets', () => {
        const state = createState()
        state.ids = [ID]
        state.all = {
          [ID]: { gameId: GAME_ID }
        }

        const actual = getters.gameIdsForAllBets(state)

        expect(actual).toEqual([GAME_ID])
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

