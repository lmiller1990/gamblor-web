import { shallowMount } from '@vue/test-utils'
import CurrentMatchupInfo from '@/current_matchup/current_matchup_info.vue'

const defaultProps = {
  redSideTeamId: 1,
  blueSideTeamId: 2,
  redSideGames: [],
  blueSideGames: []
}

const factory = () => shallowMount(CurrentMatchupInfo, {
  propsData: defaultProps
})

describe('CurrentMatchupInfo', () => {
  it('renders without errors', () => {
    const wrapper = factory()

    expect(wrapper.findAll({ name: 'TeamSelector' })).toHaveLength(2)
    expect(wrapper.findAll({ name: 'MatchHistory' })).toHaveLength(2)
  })

  describe('teamChanged', () => {
    it('emits a change event with correct args', () => {
      const teamId = 1
      // @ts-ignore
      const subject = CurrentMatchupInfo.methods.teamChanged
      const $emit = jest.fn()

      subject.call({ $emit }, teamId, 'red')

      expect($emit).toHaveBeenCalledWith('change', teamId, 'red')
    })
  })
})
