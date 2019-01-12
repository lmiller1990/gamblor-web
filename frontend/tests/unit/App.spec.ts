import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import App from '@/App.vue'
import HowToUse from '@/components/how_to_use.vue' 
import BetSleeve from '@/bet_sleeve/bet_sleeve.vue' 
import UpcomingMatchesContainer from '@/upcoming_matches/upcoming_matches_container.vue' 

const SPLIT_ID = 1
const createMockStore = (commit = () => {}, dispatch = () => {}) => ({
  dispatch: dispatch,
  commit: commit,
  state: {
    leagues: {
      splitId: SPLIT_ID
    }
  }
})

const promiseMock = jest.fn().mockReturnValue(Promise.resolve())

// @ts-ignore
const factory = ($store: object, ...mockFns: Function[]) => shallowMount(App, {
  mocks: { $store },
  methods: {
    fetchBets: promiseMock,
    fetchBankAccount: promiseMock,
    fetchLeaguesAndSplits: promiseMock,
    ...mockFns,
  }
})

xdescribe('App', () => {
  describe('created', () => {
    it('fetches initial data', async () => {
      const dispatchMock = jest.fn()
      const fetchBets = promiseMock
      const fetchBankAccount = promiseMock
      const fetchLeaguesAndSplits = promiseMock
      const setDefaultSplitId = promiseMock
      const wrapper = factory(createMockStore(() => {}, dispatchMock), fetchBets, fetchLeaguesAndSplits, setDefaultSplitId)

      await flushPromises()

      expect(fetchBets).toHaveBeenCalled()
      expect(fetchBankAccount).toHaveBeenCalled()
      expect(fetchLeaguesAndSplits).toHaveBeenCalled()
      expect(dispatchMock).toHaveBeenCalledWith('settings/getSettings')
      expect(setDefaultSplitId).toHaveBeenCalled()
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
