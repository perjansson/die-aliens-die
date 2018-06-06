import React from 'react'
import { shape, number } from 'prop-types'

const FlyingObjectBase = ({ position: { x, y } }) => {
  const style = {
    fill: '#979797',
    stroke: '#5c5c5c',
    strokeWidth: '1.5px',
  }

  return <ellipse cx={x} cy={y} rx="40" ry="10" style={style} />
}

FlyingObjectBase.propTypes = {
  position: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
}

export default FlyingObjectBase
