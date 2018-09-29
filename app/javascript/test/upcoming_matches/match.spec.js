import { shallowMount } from '@vue/test-utils'
import Match from '../../src/upcoming_matches/match.vue'

describe('Match', () => {
  describe('teamImage', () => {
    it('returns a team icon image path', () => {
      const clg = 'counter logic gaming'
      const tsm = 'team solomid'
      
      const wrapper = shallowMount(Match, {
        propsData: {
          matchId: 1
        },
        computed: {
          blueTeam: () => ({ name: clg }),
          redTeam: () => ({ name: tsm }),
          teams: () => ({})
        }
      })

      expect(wrapper.findAll('img').at(0).element.src.includes('/images/counter_logic_gaming.png')).toBe(true)
      expect(wrapper.findAll('img').at(1).element.src.includes('/images/team_solomid.png')).toBe(true)
    })
  })
})
