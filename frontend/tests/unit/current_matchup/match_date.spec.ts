import { shallowMount } from '@vue/test-utils'
import MatchDate from '@/current_matchup/match_date.vue'

const context = describe

const ID = 1
const DATE = new Date().toString()

const factory = ({ canEdit }: { canEdit: boolean }) =>
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

      expect(wrapper.vm.$el.querySelector('div').getAttribute('href')).toBe(null)
    })
  })

  context('user is canEdit', () => {
    it('renders the date with link to edit', () => {
      const wrapper = factory({ canEdit: true })

      expect(wrapper.vm.$el.querySelector('a').getAttribute('href')).toBe(`/games/${ID}/edit`)
    })
  })
})
