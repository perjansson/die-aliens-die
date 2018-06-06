import React, { Component } from 'react'
import { shape, bool, number, func } from 'prop-types'

import { getCanvasMousePosition } from 'utils/formulas'
import Canvas from 'components/Canvas'

class App extends Component {
  componentDidMount() {
    setInterval(this.handleUpdate, 10)

    window.onresize = () => {
      const cnv = document.getElementById('die-aliens-die-canvas')
      const { innerWidth, innerHeight } = window
      cnv.style.width = `${innerWidth}px`
      cnv.style.height = `${innerHeight}px`
    }
    window.onresize()
  }

  handleUpdate = () => {
    this.props.moveObjects(this.canvasMousePosition)
  }

  handleMouseMove = event => {
    this.canvasMousePosition = getCanvasMousePosition(event)
  }

  render() {
    const { gameState, startGame, angle } = this.props

    return (
      <Canvas
        gameState={gameState}
        startGame={startGame}
        angle={angle}
        onMouseMove={this.handleMouseMove}
      />
    )
  }
}

App.propTypes = {
  gameState: shape({
    started: bool.isRequired,
    kills: number.isRequired,
    lives: number.isRequired,
  }).isRequired,
  startGame: func.isRequired,
  angle: number.isRequired,
  moveObjects: func.isRequired,
}

export default App
