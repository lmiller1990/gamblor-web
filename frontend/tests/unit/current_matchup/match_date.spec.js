import { shallowMount } from '@vue/test-utils'
import MatchDate from '../../src/current_matchup/match_date.vue'

const context = describe

const ID = 1
const DATE = new Date().toString()

const factory = ({ canEdit }) =>
  shallowMount(MatchDate, {
    propsData: {
      id: ID,
      date: DATE,
      canEdit
    }
  })

describe('MatchDate', () => {
  context('user is non canEdit', () => {
    it('renders the date', () => {
      const wrapper = factory({ canEdit: false })

      expect(wrapper.vm.$el.getAttribute('href')).toBe(null)
    })
  })

  context('user is canEdit', () => {
    it('renders the date with link to edit', () => {
      const wrapper = factory({ canEdit: true })

      expect(wrapper.vm.$el.getAttribute('href')).toBe(`/games/${ID}/edit`)
    })
  })
})
