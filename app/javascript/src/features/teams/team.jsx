import React from 'react'
import axios from 'axios'
import TeamTimeline from './team_timeline.jsx'
import camelCase from 'camelcase-keys'

export default class Team extends React.Component {
  constructor() {
    super()

    this.state = {
      teamId: '',
      team: {},
      teams: [],
      games: []
    }
  }

  async fetchTeam(id) {
    const { data } = await axios.get(`/api/v1/teams/${id}`)
    this.setState({ 
      games: camelCase(data.games, true),
      team: camelCase(data.team, true)
    })
  }

  async componentDidMount() {
    const teams = await axios.get('/api/v1/teams')
    this.setState({ teams: camelCase(teams.data, true) })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select onChange={e => this.fetchTeam(e.target.value)}>
            {
              this.state.teams.map(x => <option key={x.id} value={x.id}>{x.name}</option>)
            }
          </select>
        </form>

        {this.state.games.length &&
          <TeamTimeline
            teamName={this.state.team.name}
            teamId={this.state.team.id}
            teams={this.state.teams}
            games={this.state.games}
          />
        }
      </div>
    )
  }
}
