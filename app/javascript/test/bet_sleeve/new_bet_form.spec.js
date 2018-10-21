import { shallowMount } from '@vue/test-utils'
import NewBetForm from '../../src/bet_sleeve/new_bet_form.vue'

const id = 1
const teamBetOn = 'TSM'
const market = 'ft'
const odds = 1.5
const gameTitle = 'TSM vs CLG'

const factory = () => 
  shallowMount(NewBetForm, {
    propsData: {
      id,
      teamBetOn,
      market,
      odds,
      gameTitle
    }
  })

describe('NewBetForm', () => {
  it('emits a submit event with price submitted', () => {
    const wrapper = factory()
    wrapper.setData({ priceDollars: '1.50' })
    wrapper.find('form').trigger('submit')

    expect(wrapper.emitted().submit[0][0]).toBe(1.5)
  })
})