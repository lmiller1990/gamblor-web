import { shallowMount } from '@vue/test-utils'
import MatchDate from '../../src/current_matchup/match_date.vue'

const context = describe

const ID = 1
const DATE = new Date().toString()

const factory = ({ admin }) =>
  shallowMount(MatchDate, {
    propsData: {
      id: ID,
      date: DATE,
      admin
    }
  })

describe('MatchDate', () => {
  context('user is non admin', () => {
    it('renders the date', () => {
      const wrapper = factory({ admin: false })

      expect(wrapper.vm.$el.getAttribute('href')).toBe(null)
    })
  })

  context('user is admin', () => {
    it('renders the date with link to edit', () => {
      const wrapper = factory({ admin: true })

      expect(wrapper.vm.$el.getAttribute('href')).toBe(`/games/${ID}/edit`)
    })
  })
})
