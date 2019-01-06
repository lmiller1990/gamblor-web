import { shallowMount } from '@vue/test-utils'
import LeagueSplitSelector from '@/components/league_split_selector.vue'

const NA_LCS = { id: 1, name: 'na lcs' }
const EU_LCS = { id: 2, name: 'eu lcs' }
const SPLITS = [NA_LCS, EU_LCS]

const factory = ({ showAllPlaceholder = false }) => 
  shallowMount(LeagueSplitSelector, {
    propsData: { showAllPlaceholder: showAllPlaceholder },
    mocks: {
      $store: {
        getters: {
          'leagues/splits': SPLITS
        }
      }
    }
  })

describe('LeagueSplitSelector', () => {
  test('render', () => {
    const wrapper = factory({})

    expect(wrapper.findAll('option')).toHaveLength(SPLITS.length)
  })

  test('it renders an "All" placeholder', () => {
    const wrapper = factory({ showAllPlaceholder: true })

    expect(wrapper.findAll('option').at(2).text()).toBe('All')
  })
})

