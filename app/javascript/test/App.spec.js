import { shallowMount } from '@vue/test-utils'
import App from '../src/App.vue'
import flushPromises from 'flush-promises'

const SPLIT_ID = 1

const promiseMock = jest.fn().mockReturnValue(Promise.resolve())

const factory = (...mocks) => shallowMount(App, {
  methods: {
    fetchBets: promiseMock,
    fetchLeaguesAndSplits: promiseMock,
    setDefaults: jest.fn(),
    ...mocks,
  }
})

describe('App', () => {
  describe('created', () => {
    it('fetches initial data', async() => {
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
})
