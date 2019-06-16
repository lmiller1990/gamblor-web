import { shallowMount } from '@vue/test-utils'
import { Store } from 'vuex-mock-store'
import Match from '@/upcoming_matches/match.vue'
import UpcomingMatchContainer from '@/upcoming_matches/upcoming_matches_container.vue'

// TODO: This should probably gameId, not matchId in the entire component.
const MATCH_ID = 1
const SPLIT_ID = 2
const MATCH_IDS = [MATCH_ID]
const factory = (store = {}) => 
  shallowMount(UpcomingMatchContainer, {
    propsData: {
      splitId: SPLIT_ID
    },
    computed: {
      matchIds: () => MATCH_IDS,
      matches: () => [{ id: MATCH_ID }]
    },
    mocks: {
      $store: store
    }
  })

describe('UpcomingMatchContainer', () => {
  it('renders a match', () => {
    const wrapper = factory()

    expect(wrapper.findAll(Match)).toHaveLength(MATCH_IDS.length)
  })

  it('fetchGamesAndTeams is called when splitId changes', () => {
    const wrapper = factory()
    const fetchAllGames = jest.fn()
    wrapper.setMethods({ fetchAllGames })
    wrapper.setProps({ splitId: SPLIT_ID + 1 })

    expect(fetchAllGames).toHaveBeenCalled()
  })

  describe('selectSplit', () => {
    it('emits selectSplit and fetches games using new split id', async () => {
      const wrapper = factory()
      const fetchGames = jest.fn()
      wrapper.setMethods({ fetchGames, scrollToBottomOfContainer: () => {} })

      // @ts-ignore
      await wrapper.vm.selectSplit(SPLIT_ID)

      expect(wrapper.emitted().selectSplit[0][0]).toEqual({ id: SPLIT_ID })
      expect(fetchGames).toHaveBeenCalledWith(SPLIT_ID)
    })
  })
})
