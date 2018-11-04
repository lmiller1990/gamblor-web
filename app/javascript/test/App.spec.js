import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import App from '../src/App.vue'
import HowToUse from '../src/components/how_to_use.vue' 
import BetSleeve from '../src/bet_sleeve/bet_sleeve.vue' 
import UpcomingMatchesContainer from '../src/upcoming_matches/upcoming_matches_container.vue' 

const SPLIT_ID = 1
const createMockStore = (commit = () => {}) => ({
  commit: commit,
  state: {
    leagues: {
      splitId: SPLIT_ID
    }
  }
})

const promiseMock = jest.fn().mockReturnValue(Promise.resolve())

const factory = ($store, ...mockFns) => shallowMount(App, {
  mocks: { $store },
  methods: {
    fetchBets: promiseMock,
    fetchBankAccount: promiseMock,
    fetchLeaguesAndSplits: promiseMock,
    setDefaults: jest.fn(),
    ...mockFns,
  }
})

describe('App', () => {
  describe('created', () => {
    it('fetches initial data', async () => {
      const fetchBets = promiseMock
      const fetchBankAccount = promiseMock
      const fetchLeaguesAndSplits = promiseMock
      const setDefaults = promiseMock
      const wrapper = factory(createMockStore(), fetchBets, fetchLeaguesAndSplits, setDefaults)

      await flushPromises()

      expect(fetchBets).toHaveBeenCalled()
      expect(fetchBankAccount).toHaveBeenCalled()
      expect(fetchLeaguesAndSplits).toHaveBeenCalled()
      expect(setDefaults).toHaveBeenCalled()
      expect(wrapper.vm.loaded).toBe(true)

    })
  })

  test('splitId assigns an id', () => {
    const commit = jest.fn()
    const mockStore = createMockStore(commit)
    const wrapper = factory(mockStore)

    wrapper.vm.setSplitId({ id: SPLIT_ID })

    expect(commit).toHaveBeenCalledWith('leagues/SET_SPLIT_ID', SPLIT_ID)

  })

  test('showBetSleeve sets sidebarComponent = BetSleeve', () => {
    const mockStore = createMockStore()
    const wrapper = factory(mockStore)

    wrapper.vm.showBetSleeve()

    expect(wrapper.vm.sidebarComponent).toBe(BetSleeve)
  })

  test('showHowToUse sets sidebarComponent = HowToUse', () => {
    const mockStore = createMockStore()
    const wrapper = factory(mockStore)

    wrapper.vm.showHowToUse()

    expect(wrapper.vm.sidebarComponent).toBe(HowToUse)
  })

  test('showSchedule sets sidebarComponent = UpcomingMatchesContainer', () => {
    const mockStore = createMockStore()
    const wrapper = factory(mockStore)

    wrapper.vm.showSchedule()

    expect(wrapper.vm.sidebarComponent).toBe(UpcomingMatchesContainer)
  })
})
