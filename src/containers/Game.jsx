import { connect } from 'react-redux'

import { moveObjects, startGame, shoot } from 'actions'
import App from 'App'

const mapStateToProps = state => {
  const { angle, gameState } = state

  return {
    angle,
    gameState,
  }
}

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame()),
  moveObjects: mousePosition => dispatch(moveObjects(mousePosition)),
  shoot: mousePosition => dispatch(shoot(mousePosition)),
})

const Game = connect(mapStateToProps, mapDispatchToProps)(App)

export default Game
