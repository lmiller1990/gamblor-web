import { shallowMount } from '@vue/test-utils'
import BankrollContainer from '@/bankroll_management/bankroll_container.vue'

const factory = () => shallowMount(BankrollContainer, {
  computed: {
    odds: () => 1.5,
    bankroll: () => 10000,
    evs: () => [
      { nLastGames: 2, ev: 2.2 },
      { nLastGames: 5, ev: 1.2 }
    ]
  }
})

describe('BankrollContainer', () => {
  it('renders some recommendations', () => {
    const wrapper = factory()

    expect(wrapper.findAll('li')).toHaveLength(2)
  })
})
