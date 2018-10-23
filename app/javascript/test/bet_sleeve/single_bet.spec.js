import { shallowMount } from '@vue/test-utils'
import SingleBet from '../../src/bet_sleeve/single_bet.vue'
import { BetStatus } from '../../src/types/bet'

const id = 1
const teamBetOn = 'TSM'
const market = 'ft'
const odds = 1.5
const gameTitle = 'TSM vs CLG'
const priceCents = 1500
const status = BetStatus.AwaitingResult
const SHORT_MARKET = 'fb'
const LONG_MARKET = 'First Blood'

const factory = () => 
  shallowMount(SingleBet, {
    propsData: {
      id,
      teamBetOn,
      market: SHORT_MARKET,
      odds,
      gameTitle,
      priceCents,
      status
    }
  })

describe('SingleBet', () => {
  it('renders', () => {
    const wrapper = factory()
  })

  describe('format', () => {
    it('renders a market name in long form', () => {
      const text = factory().find('[data-bet-title]').text()

      expect(text).toBe(`${teamBetOn} to get ${LONG_MARKET}`)
    })
  })
})
