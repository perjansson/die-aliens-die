import React from 'react'
import { shape, number } from 'prop-types'

const CannonBall = ({ position }) => {
  const ballStyle = {
    fill: '#777',
    stroke: '#444',
    strokeWidth: '2px',
  }

  return (
    <ellipse
      style={ballStyle}
      cx={position.x}
      cy={position.y}
      rx="16"
      ry="16"
    />
  )
}

CannonBall.propTypes = {
  position: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
}

export default CannonBall
