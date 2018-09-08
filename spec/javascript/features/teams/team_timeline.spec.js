import React from 'react'
import { shallow } from 'enzyme'
import TeamTimeline from 'features/teams/team_timeline.jsx'

const teamName = 'TSM'
const teamId = 1
const games = [
  {
    opponent: 'Cloud 9',
    firstBloodTeamId: true,
    firstTurretTeamId: false,
    winnerId: true
  }
]
describe('Team', () => {
  it('renders a form', () => {
    const wrapper = shallow(
      <TeamTimeline 
        teamName={teamName}
        teamId={teamId}
        games={games}
      />
    )

    expect(wrapper.find('h2').text()).toContain(teamName)
  })
})
