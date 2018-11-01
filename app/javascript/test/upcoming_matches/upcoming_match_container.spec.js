import { shallowMount } from '@vue/test-utils'
import Match from '../../src/upcoming_matches/match.vue'
import UpcomingMatchContainer from '../../src/upcoming_matches/upcoming_matches_container.vue'

// TODO: This should probably gameId, not matchId in the entire component.
const MATCH_ID = 1
const SPLIT_ID = 2
const MATCH_IDS = [MATCH_ID]
const factory = () => 
  shallowMount(UpcomingMatchContainer, {
    computed: {
      matchIds: () => MATCH_IDS,
      matches: () => [{ id: MATCH_ID }]
    }
  })

describe('UpcomingMatchContainer', () => {
  xtest('clicking Show All fetches games and updates text accordingly', () => {
    // need mock store
    const wrapper = factory()
  })

  it('renders a match', () => {
    const wrapper = factory()

    expect(wrapper.findAll(Match)).toHaveLength(MATCH_IDS.length)
  })

  it('fetches teams and games when splitId changes', () => {
    const wrapper = factory()
    const fetchGamesAndTeams = jest.fn()
    wrapper.setMethods({ fetchGamesAndTeams })

    wrapper.setProps({ splitId: SPLIT_ID })

    expect(fetchGamesAndTeams).toHaveBeenCalled()
  })

  describe('selectSplit', () => {
    it('emits selectSplit and fetches games using new split id', async () => {
      const wrapper = factory()
      const fetchGames = jest.fn()
      wrapper.setMethods({ fetchGames, scrollToBottomOfContainer: () => {} })

      await wrapper.vm.selectSplit(SPLIT_ID)

      expect(wrapper.emitted().selectSplit[0][0]).toEqual({ id: SPLIT_ID })
      expect(fetchGames).toHaveBeenCalledWith(SPLIT_ID)
    })
  })
})
