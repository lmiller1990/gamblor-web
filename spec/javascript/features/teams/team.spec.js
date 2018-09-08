import React from 'react'
import { shallow } from 'enzyme'
import Team from 'features/teams/team.jsx'

describe('Team', () => {
  it('renders a form', () => {
    const wrapper = shallow(<Team />)

    expect(wrapper.find('form').exists()).toBe(true)
  })
})
