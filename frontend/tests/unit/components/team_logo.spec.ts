import { shallowMount } from '@vue/test-utils'
import TeamLogo from '@/components/team_logo.vue'

describe('TeamLogo', () => {
  describe('teamLogo', () => {
    it('returns a team icon image path', () => {
      const wrapper = shallowMount(TeamLogo, {
        propsData: {
          teamName: 'Counter Logic Gaming'
        }
      })

      expect((wrapper.findAll('img').at(0).element as HTMLImageElement)
        .src.includes('/images/counter_logic_gaming.png')).toBe(true)
    })
  })
})
