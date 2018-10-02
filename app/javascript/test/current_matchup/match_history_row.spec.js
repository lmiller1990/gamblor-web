import { shallowMount } from '@vue/test-utils'
import MatchHistoryRow from '../../src/current_matchup/match_history_row.vue'

describe('MatchHistoryRow', () => {
  const factory = ({ victory }) => 
    shallowMount(MatchHistoryRow, {
      propsData: { victory }
    })

  it('renders market and styles based on result', () => {
    const wrapper = factory({ victory: true })

    expect(wrapper.classes()).toContain('victory')
  })

  it('renders market and styles based on result', () => {
    const wrapper = factory({ victory: false })

    expect(wrapper.classes()).toContain('defeat')
  })

  it('renders market and styles based on result', () => {
    const wrapper = factory({ victory: undefined })

    expect(wrapper.classes()).not.toContain('defeat')
    expect(wrapper.classes()).not.toContain('victory')
  })
})
