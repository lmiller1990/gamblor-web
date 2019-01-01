import { shallowMount } from '@vue/test-utils'
import ModalManager from '@/components/modal_manager.vue'

const Comp = {
  name: 'Comp',
  render: (h: Function) => h('span')
}

const $store = {
  state: {
    modal: {
      show: true,
      component: Comp
    }
  }
}

describe('ModalManager', () => {
  it('renders a component dynamically', () => {
    const wrapper = shallowMount(ModalManager, {
      mocks: { $store }
    })

    expect(wrapper.find(Comp).exists()).toBe(true)
  })
})
