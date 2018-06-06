import React from 'react'
import { shape, bool, number, func, arrayOf } from 'prop-types'

import { gameHeight } from 'utils/constants'
import Sky from 'components/Sky'
import Ground from 'components/Ground'
import Cannon from 'components/Cannon'
import CannonBall from 'components/CannonBall'
import CurrentScore from 'components/CurrentScore'
import FlyingObject from 'components/FlyingObject'
import Heart from 'components/Heart'
import StartGame from 'components/StartGame'
import Title from 'components/Title'

const Canvas = ({
  gameState: { started, flyingObjects, cannonBalls },
  startGame,
  angle,
  onMouseMove,
  shoot,
}) => {
  const viewBox = [
    window.innerWidth / -2,
    100 - gameHeight,
    window.innerWidth,
    gameHeight,
  ]

  return (
    <svg
      id="die-aliens-die-canvas"
      onClick={shoot}
      onMouseMove={onMouseMove}
      viewBox={viewBox}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" />
        </filter>
      </defs>
      <Sky />
      <Ground />
      {cannonBalls.map(cannonBall => (
        <CannonBall key={cannonBall.id} position={cannonBall.position} />
      ))}
      <Cannon rotation={angle} />
      {!started && (
        <g>
          <StartGame onClick={startGame} />
        </g>
      )}
      {started &&
        flyingObjects.map(({ id, position }) => (
          <FlyingObject key={id} position={position} />
        ))}
      <Heart position={{ x: -300, y: 35 }} />
      <CurrentScore score={15} />
      <Title />
    </svg>
  )
}

Canvas.propTypes = {
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
  onMouseMove: func.isRequired,
  shoot: func.isRequired,
}

export default Canvas
