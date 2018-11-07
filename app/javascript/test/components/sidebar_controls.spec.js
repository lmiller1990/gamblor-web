import { shallowMount } from '@vue/test-utils'
import SidebarControls from '../../src/components/sidebar_controls.vue'

describe('SidebarControls', () => {
  it('renders', () => {
    const wrapper = shallowMount(SidebarControls)
  })

  describe('show', () => {
    it('emits an event based on the arg when btn is clicked', () => {
      const wrapper = shallowMount(SidebarControls)

      wrapper.find('[data-test-schedule]').vm.$emit('click')

      expect(wrapper.emitted().showSchedule).toBeDefined()
    })
  })
})
