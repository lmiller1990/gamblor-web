import { shallowMount } from '@vue/test-utils'
import { Store } from 'vuex-mock-store'
import Match from '../../src/upcoming_matches/match.vue'
import UpcomingMatchContainer from '../../src/upcoming_matches/upcoming_matches_container.vue'


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
  test('clicking Show All fetches games and updates text accordingly', () => {
    // need mock store
    const store = new Store()
    const wrapper = factory(store)

    wrapper.find('[data-test-more]').trigger('click')

    expect(store.dispatch).toHaveBeenCalledWith(
      'scheduledGames/getUpcomingGames',
      { recentlyPlayed: 100, splitId: SPLIT_ID, upcoming: 100 }
    )
  })

  it('renders a match', () => {
    const wrapper = factory()

    expect(wrapper.findAll(Match)).toHaveLength(MATCH_IDS.length)
  })

  it('fetchGamesAndTeams is called when splitId changes', () => {
    const wrapper = factory()
    const fetchGamesAndTeams = jest.fn()
    wrapper.setMethods({ fetchGamesAndTeams })
    wrapper.setProps({ splitId: SPLIT_ID + 1 })

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

  describe('onFavoriteSplit', () => {
    it('returns false when splitId not equal favoriteSplitId from localStorage', () => {
      const wrapper = factory()
      wrapper.setProps({ splitId: -1 })

      expect(wrapper.vm.onFavoriteSplit).toBe(false)
    })
  })
})
