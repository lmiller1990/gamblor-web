import { shallowMount } from '@vue/test-utils'
import MatchEvTooltip from '@/current_matchup/match_ev_tooltip.vue'

const OFFSET = 100
const EV_ALL = { nLastGames: -1, ev: 1.12 }
const EV_5   = { nLastGames:  5, ev: 1.25 }

const factory = () => 
  shallowMount(MatchEvTooltip, {
    propsData: {
      topOffset: OFFSET,
      evs: [EV_ALL, EV_5]
    }
  })

describe('MatchEvTooltip', () => {
  it('renders "all" for EV over all games and number otherwise', () => {
    const wrapper = factory()

    const evs = wrapper.findAll('.ev')

    expect(evs.at(0).text()).toBe(`All: ${EV_ALL.ev}`)
    expect(evs.at(1).text()).toBe(`5: ${EV_5.ev}`)
  })

  it('calculates and assigns style offset from bottom', () => {
    const wrapper = factory()

    // @ts-ignore
    expect(wrapper.vm.offset).toEqual({ bottom: `${OFFSET}px` })
  })
})
