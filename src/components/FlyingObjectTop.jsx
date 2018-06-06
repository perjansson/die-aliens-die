import React from 'react'
import { shape, number } from 'prop-types'
import { pathFromBezierCurve } from 'utils/formulas'

const FlyingObjectTop = ({ position: { x, y } }) => {
  const style = {
    fill: '#b6b6b6',
    stroke: '#7d7d7d',
    strokeWidth: '1.5px',
  }

  const baseWidth = 40
  const halfBase = baseWidth / 2
  const height = 25

  const cubicBezierCurve = {
    initialAxis: {
      x: x - halfBase,
      y,
    },
    initialControlPoint: {
      x: 10,
      y: -height,
    },
    endingControlPoint: {
      x: 30,
      y: -height,
    },
    endingAxis: {
      x: baseWidth,
      y: 0,
    },
  }

  return <path style={style} d={pathFromBezierCurve(cubicBezierCurve)} />
}

FlyingObjectTop.propTypes = {
  position: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
}

export default FlyingObjectTop
