import { shallowMount } from '@vue/test-utils'
import App from '../src/App.vue'
import HowToUse from '../src/components/how_to_use.vue' 
import flushPromises from 'flush-promises'

jest.mock('../src/bet_sleeve/bet_sleeve.vue', () => ({
  name: 'BetSleeve',
  render: h => h('div')
}))

const SPLIT_ID = 1

const promiseMock = jest.fn().mockReturnValue(Promise.resolve())

const factory = (...mockFns) => shallowMount(App, {
  methods: {
    fetchBets: promiseMock,
    fetchLeaguesAndSplits: promiseMock,
    setDefaults: jest.fn(),
    ...mockFns,
  }
})

describe('App', () => {
  describe('created', () => {
    it('fetches initial data', async () => {
      const fetchBets = promiseMock
      const fetchLeaguesAndSplits = promiseMock
      const setDefaults = promiseMock
      const wrapper = factory(fetchBets, fetchLeaguesAndSplits, setDefaults)

      await flushPromises()

      expect(fetchBets).toHaveBeenCalled()
      expect(fetchLeaguesAndSplits).toHaveBeenCalled()
      expect(setDefaults).toHaveBeenCalled()
      expect(wrapper.vm.loaded).toBe(true)

    })
  })

  test('splitId assigns an id', () => {
    const wrapper = factory()

    wrapper.vm.setSplitId({ id: SPLIT_ID })

    expect(wrapper.vm.splitId).toBe(SPLIT_ID)
  })

  test('toggleLeftSticky changes the rendered component', () => {
    const wrapper = factory()
    wrapper.setData({ loaded: true, loadedBets: true })

    expect(wrapper.find(HowToUse).exists()).toBe(true)

    wrapper.vm.toggleLeftSticky()

    expect(wrapper.find({ name: 'BetSleeve' }).exists()).toBe(true)
  })
})
