import { shallowMount } from '@vue/test-utils'

import FavoriteMatchButton from '../upcoming_matches/favorite_match_button.vue'

describe('FavoriteMatchButton', () => {
  it('renders', () => {
    const wrapper = shallowMount(FavoriteMatchButton, {
      props: {
        splitId: 123
      }
    })
  })
})
