import React, { Component } from 'react'
import { shape, bool, number, func, arrayOf } from 'prop-types'

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

  shoot = () => {
    this.props.shoot(this.canvasMousePosition)
  }

  render() {
    const { gameState, startGame, angle } = this.props

    return (
      <Canvas
        gameState={gameState}
        startGame={startGame}
        angle={angle}
        shoot={this.shoot}
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
    flyingObjects: arrayOf(
      shape({
        position: shape({
          x: number.isRequired,
          y: number.isRequired,
        }).isRequired,
        id: number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  startGame: func.isRequired,
  angle: number.isRequired,
  moveObjects: func.isRequired,
  shoot: func.isRequired,
}

export default App
