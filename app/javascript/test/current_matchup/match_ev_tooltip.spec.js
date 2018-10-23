import { shallowMount } from '@vue/test-utils'
import MatchEvTooltip from '../../src/current_matchup/match_ev_tooltip.vue'

const OFFSET = 100

const factory = () => 
  shallowMount(MatchEvTooltip, {
    propsData: {
      topOffset: OFFSET
    }
  })

describe('MatchEvTooltip', () => {
  it('renders', () => {
    const wrapper = factory()

    expect(wrapper.vm.offset).toEqual({ top: `${OFFSET}px` })
  })
})
