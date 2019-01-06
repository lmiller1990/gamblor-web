import { shallowMount } from '@vue/test-utils'
import { BetStatus } from '@/types/bet'
import MatchHistoryRow from '@/current_matchup/match_history_row.vue'

const context = describe
const createMockStore = (commit: Function) => ({ commit })

const UNUSED_ID = 1
const GAME_ID = 2
const TEAM_ID = 3
const MARKET = 'FT'
const ODDS = 1.5

describe('MatchHistoryRow', () => {
  const factory = 
    (gameCompleted: boolean , odds?: number, victory?: boolean, store = {}) => 
    shallowMount(MatchHistoryRow, {
      propsData: {
        victory,
        gameCompleted,
        odds,
        teamId: TEAM_ID,
        gameId: GAME_ID,
        market: MARKET
      },

      mocks: { $store: store },

      computed: {
        unusedId: () => UNUSED_ID,
      },

      methods: {
        calcEvs: () => [{ nLastGames: 1, odds: ODDS }]
      }
    })

  context('game is completed', () => {
    context('team won the market', () => {
      it('renders O marker and sets victory class', () => {
        const wrapper = factory(true, undefined, true)

        expect(wrapper.classes()).toContain('victory')
        expect(wrapper.text()).toBe('✓')
      })
    })

    context('team lost the market', () => {
      it('renders marker and styles based on result', () => {
        const wrapper = factory(true, undefined, false)

        expect(wrapper.classes()).toContain('defeat')
        expect(wrapper.text()).toBe('✘')
      })
    })
  })

  context('game has not been played', () => {
    it('does not render marker or give victory/defeat class', () => {
      const wrapper = factory(false, ODDS, undefined)

      expect(wrapper.classes()).not.toContain('defeat')
      expect(wrapper.classes()).not.toContain('victory')
      expect(wrapper.classes()).toContain('awaiting_result')
      expect(wrapper.text()).toBe('1.5')
    })
  })

  describe('createBet', () => {
    context('game has not been played', () => {
      it('commits a ADD_BET mutation when clicked', () => {
        const commit = jest.fn()
        const wrapper = factory(false, ODDS, undefined, { commit })
        const bet = {
          id: UNUSED_ID * -1,
          priceCents: 0,
          odds: ODDS,
          gameId: GAME_ID,
          market: MARKET,
          teamBetOnId: TEAM_ID,
          status: BetStatus.AwaitingResult
        }

        wrapper.trigger('click')

        expect(commit).toHaveBeenCalledWith('bets/ADD_BET', { bet })
      })
    })

    context('game has been played', () => {
      it('does nothing', () => {
        const commit = jest.fn()
        const wrapper = factory(true, ODDS, undefined, { commit })

        wrapper.trigger('click')

        expect(commit).not.toHaveBeenCalled()
      })
    })

    context('odds are null (such case of upcoming ame where are yet to annouced)', () => {
      it('does nothing', () => {
        const commit = jest.fn()
        const wrapper = factory(true, undefined, undefined, { commit })

        wrapper.trigger('click')

        expect(commit).not.toHaveBeenCalled()
      })
    })
  })
})
