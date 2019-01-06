import { shallowMount } from '@vue/test-utils'
import TeamSelector from '@/components/team_selector.vue'

describe('TeamSelector', () => {
  const teamId = 1
  const anotherTeamId = 2

  const factory = (selectedId = teamId) =>
    shallowMount(TeamSelector, {
      propsData: { selectedId },

      computed: {
        allTeams: () => ({ 
          [teamId]: { name: 'team_name' },
          [anotherTeamId]: { name: 'another_team' }
        }),
        allTeamIds: () => [teamId, anotherTeamId]
      }
    })

  it('renders teams', () => {
    expect(factory().findAll('option')).toHaveLength(2)
  })

  it('emits a change event', () => {
    const wrapper = factory()

    wrapper.trigger('change')

    expect(wrapper.emitted().change[0][0]).toEqual(teamId)
  })

  it('sets a selected option using props', () => { 
    const wrapper = factory(anotherTeamId)

    expect((wrapper.find(`[value="${anotherTeamId}"]`).element as HTMLOptionElement)
      .selected).toBe(true)
  })
})
