import React from 'react'
import PropTypes from 'prop-types'
import Game from './game.jsx'

export default class TeamTimeline extends React.Component {
  constructor(props) {
    super(props)

    this.getOpponent = this.getOpponent.bind(this)
  }

  getOpponent(game) {
    const opponentId = [game.winnerId, game.loserId].find(x => x!== this.props.teamId)

    return this.props.teams.find(x => x.id === opponentId).name
  }


  render() {
    return (
      <div>
        <h2>Games for {this.props.teamName}</h2>
        {
          this.props.games.map(game => 
            <Game 
              key={game.id}
              opponent={this.getOpponent(game)}
              didWin={game.winnerId === this.props.teamId}
              didGetFirstBlood={game.firstBloodTeamId === this.props.teamId}
              didGetFirstTurret={game.firstTurretTeamId === this.props.teamId}
            />
          )
        }
      </div>
    )
  }
}

