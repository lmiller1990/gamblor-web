import React from 'react'
import axios from 'axios'
import camelCase from 'camelcase-keys'
import snakeCase from 'snakecase-keys'

export default class GameContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      teams: [],
      firstBloodTeamId: null,
      firstTurretTeamId: null,
      winnerId: null,
      loserId: null,
      date: new Date().toJSON().slice(0, 10)
    }
  }

  componentDidMount() {
    this.fetchTeams()
  }

  async submit(e) {
    e.preventDefault()

    const game = {
      firstBloodTeamId: this.state.firstBloodTeamId,
      firstTurretTeamId: this.state.firstTurretTeamId,
      winnerId: this.state.winnerId,
      loserId: this.state.loserId,
      date: this.state.date
    }
    const response = await axios.put('/api/v1/games', {
      game: snakeCase(game, true)
    })
  }

  async fetchTeams() {
    const teams = await axios.get(`/api/v1/teams?game_id=#{}`)
    this.setState({ teams: camelCase(teams.data, true) })
  }

  render() {
    return (
      <div>
        <h3>Update Game</h3>
        <form onSubmit={e => this.submit(e)}>
          <label htmlFor="date">Date</label>
          <input 
            id="date" 
            type="date" 
            name="date" 
            value={this.state.date}
            onChange={e => this.setState({ date: e.target.value })}
          />

          <label htmlFor="fb">First Blood</label>
          <select 
            id="fb" 
            onChange={e => this.setState({ firstBloodTeamId: parseInt(e.target.value) })}
          >
            { 
              this.state.teams.map(x => <option key={x.id} value={x.id}>{ x.name }</option>)
            }
          </select>
          <label htmlFor="ft">First Turret</label>
          <select 
            id="ft" 
            onChange={e => this.setState({ firstTurretTeamId: parseInt(e.target.value) })}
          >
            { 
              this.state.teams.map(x => <option key={x.id} value={x.id}>{ x.name }</option>)
            }
          </select>
          <label htmlFor="winner">Winner</label>
          <select 
            id="winner" 
            onChange={e => this.setState({ winnerId: parseInt(e.target.value) })}
          >
            { 
              this.state.teams.map(x => <option key={x.id} value={x.id}>{ x.name }</option>)
            }
          </select>
          <label htmlFor="loser">Loser</label>
          <select 
            id="loser" 
            onChange={e => this.setState({ loserId: parseInt(e.target.value) })}
          >
            { 
              this.state.teams.map(x => <option key={x.id} value={x.id}>{ x.name }</option>)
            }
          </select>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}
