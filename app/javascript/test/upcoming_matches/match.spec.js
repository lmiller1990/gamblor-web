import { shallowMount } from '@vue/test-utils'
import Match from '../../src/upcoming_matches/match.vue'
import TeamLogo from '../../src/components/team_logo.vue'

describe('Match', () => {
  const clg = 'counter logic gaming'
  const tsm = 'team solomid'
  const matchId = 1

  const factory = () => shallowMount(Match, {
    propsData: { matchId },
    computed: {
      blueTeam: () => ({ name: clg }),
      redTeam: () => ({ name: tsm }),
      teams: () => ({})
    }
  })

  it('renders two team logos', () => {
    const wrapper = factory()

    expect(wrapper.findAll(TeamLogo)).toHaveLength(2)
  })

  it('emits a selected event with match id when clicked', () => {
    const wrapper = factory()

    wrapper.trigger('click')

    expect(wrapper.emitted().selected[0][0]).toEqual({ matchId })
  })
})
