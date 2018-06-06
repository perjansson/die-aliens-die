import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getCanvasMousePosition } from './utils/formulas'
import Canvas from './components/Canvas'

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
    return (
      <Canvas angle={this.props.angle} onMouseMove={this.handleMouseMove} />
    )
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  moveObjects: PropTypes.func.isRequired,
}

export default App
