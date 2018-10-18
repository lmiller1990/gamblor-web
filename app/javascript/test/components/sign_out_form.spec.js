import { shallowMount } from '@vue/test-utils'
import SignOutForm from '../../src/components/sign_out_form.vue'

describe('SignOutForm', () => {
  it('renders', () => {
    const signout = jest.fn()
    const wrapper = shallowMount(SignOutForm, {
      methods: { signout }
    })

    wrapper.trigger('submit.prevent')

    expect(signout).toHaveBeenCalled()
  })
})
