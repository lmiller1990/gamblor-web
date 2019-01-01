import { shallowMount } from '@vue/test-utils'
import Match from '../../src/upcoming_matches/match.vue'
import TeamLogo from '../../src/components/team_logo.vue'

const context = describe

describe('Match', () => {
  const clg = 'counter logic gaming'
  const tsm = 'team solomid'
  const matchId = 1

  const factory = () => shallowMount(Match, {
    propsData: { matchId },
    computed: {
      blueTeam: () => ({ name: clg }),
      redTeam: () => ({ name: tsm }),
      match: () => ({}),
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

describe('styleCompleteGameByResult', () => {
  const subject = Match.methods.styleCompleteGameByResult

  context('team won game', () => {
    const localThis = { match: { winnerId: 1 } }

    const result = subject.call(localThis, { id: 1 })

    expect(result).toBe('winning_team')
  })

  context('team lost game', () => {
    const localThis = { match: { loserId: 1 } }

    const result = subject.call(localThis, { id: 1 })

    expect(result).toBe('losing_team')
  })

  context('game is pending, team neither won nor lost', () => {
    const localThis = { match: {} }

    const result = subject.call(localThis, { id: 1 })

    expect(result).toBe('result_pending')
  })

  context('team is null for whatever reason, probably a bug', () => {
    const localThis = { match: {} }

    const result = subject.call(localThis, undefined)

    expect(result).toBe('result_pending')
  })
})
