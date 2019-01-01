import { state, mutations, getters } from '@/store/leagues'
import { LeaguesState } from '@/store/types'

const createState = (): LeaguesState => Object.assign({}, state)
const splitData = { id: 0, leagueId: 1 }
const SUMMMER_SPLIT = { ...splitData, name: 'summer split' }
const SPRING_SPLIT = { ...splitData, name: 'spring split' }
const WINTER_SPLIT = { ...splitData, name: 'winter split' }
const SPLIT_ID = 1

describe('leagues store', () => {
  describe('mutations', () => {
    test('SET_SPLIT_ID assigns an id', () => {
      const state = createState()

      mutations.SET_SPLIT_ID(state, SPLIT_ID)

      expect(state.splitId).toBe(SPLIT_ID)
    })

    test('SET_DEFAULT_SPLIT', () => {
      const state = createState()

      mutations.SET_DEFAULT_SPLIT(state, { defaultSplit: 'groups' })

      expect(state.defaultSplit).toBe('groups')
    })

    test('SET_LEAGUES assigns league to state', () => {
      const split = { id: 0, name: 'summer' }
      const league = { splits: [split] }
      const state = createState()

      mutations.SET_LEAGUES(state, { leagues: [league] })

      expect(state.all).toEqual([league])
    })
  })

  describe('getters', () => {
    describe('splits', () => {
      it('gets each split in the format [league - split]', () => {
        const state = createState()
        state.all = [{ 
          id: 0, 
          name: 'worlds',
          splits: [
            { id: 1, name: 'playin', leagueId: 1 },
            { id: 2, name: 'groups', leagueId: 1 }
          ]
        }]

        const actual = getters.splits(state)    

        expect(actual).toEqual([
          { id: 1, name: 'worlds - playin' },
          { id: 2, name: 'worlds - groups' }
        ])
      })
    })

    describe('getSplitByName', () => {
      it('gets a split by name', () => {
        const state = createState()
        state.all = [
          { id: 0, name: 'League 0', splits: [SUMMMER_SPLIT, SPRING_SPLIT] },
          { id: 1, name: 'League 1', splits: [WINTER_SPLIT] },
        ]

        const actual = getters.getSplitByName(state)(WINTER_SPLIT.name)

        expect(actual).toBe(WINTER_SPLIT)
      })
    })
  })
})
