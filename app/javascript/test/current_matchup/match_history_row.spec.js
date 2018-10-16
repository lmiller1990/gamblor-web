import { shallowMount } from '@vue/test-utils'
import MatchHistoryRow from '../../src/current_matchup/match_history_row.vue'

const context = describe

describe('MatchHistoryRow', () => {
  const factory = ({ victory = undefined, gameCompleted = true, odds = 0.0 }) => 
    shallowMount(MatchHistoryRow, {
      propsData: { victory, gameCompleted, odds }
    })

  context('game is completed', () => {
    context('team won the market', () => {
      it('renders O marker and sets victory class', () => {
        const wrapper = factory({ victory: true })

        expect(wrapper.classes()).toContain('victory')
        expect(wrapper.text()).toBe('✓')
      })
    })

    context('team lost the market', () => {
      it('renders marker and styles based on result', () => {
        const wrapper = factory({ victory: false })

        expect(wrapper.classes()).toContain('defeat')
        expect(wrapper.text()).toBe('✘')
      })
    })
  })

  context('game has not been played', () => {
    it('does not render marker or give victory/defeat class', () => {
      const wrapper = factory({ gameCompleted: false, odds: 1.5 })

      expect(wrapper.classes()).not.toContain('defeat')
      expect(wrapper.classes()).not.toContain('victory')
      expect(wrapper.text()).toBe('1.5')
    })
  })
})
