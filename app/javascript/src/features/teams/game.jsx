import React from 'react'
import PropTypes from 'prop-types'

export default class Game extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          {this.props.opponent}      
        </div>
        <div>
          {'' + this.props.didGetFirstTurret}      
        </div>
        <div>
          {'' + this.props.didGetFirstBlood}      
        </div>
        <div>
          {'' + this.props.didWin}      
        </div>
      </div>
    )
  }
}
