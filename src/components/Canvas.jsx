import React from 'react'
import PropTypes from 'prop-types'

import Sky from 'components/Sky'
import Ground from 'components/Ground'
import Cannon from 'components/Cannon'
import CannonBall from 'components/CannonBall'
import CurrentScore from 'components/CurrentScore'
import FlyingObject from 'components/FlyingObject'

const Canvas = ({ angle, onMouseMove }) => {
  const viewBox = [
    window.innerWidth / -2,
    100 - window.innerHeight,
    window.innerWidth,
    window.innerHeight,
  ]

  return (
    <svg id="die-aliens-die-canvas" onMouseMove={onMouseMove} viewBox={viewBox}>
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Ground />
      <Cannon rotation={angle} />
      <CannonBall position={{ x: 0, y: -100 }} />
      <CurrentScore score={15} />
      <FlyingObject position={{ x: -150, y: -300 }} />
      <FlyingObject position={{ x: 150, y: -300 }} />
    </svg>
  )
}

Canvas.propTypes = {
  angle: PropTypes.number.isRequired,
  onMouseMove: PropTypes.func.isRequired,
}

export default Canvas
