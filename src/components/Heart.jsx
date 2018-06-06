import React from 'react'
import { shape, number } from 'prop-types'
import { pathFromBezierCurve } from 'utils/formulas'

const Heart = ({ position: { x, y } }) => {
  const heartStyle = {
    fill: '#da0d15',
    stroke: '#a51708',
    strokeWidth: '2px',
  }

  const leftSide = {
    initialAxis: { x, y },
    initialControlPoint: { x: -20, y: -20 },
    endingControlPoint: { x: -40, y: 10 },
    endingAxis: { x: 0, y: 40 },
  }

  const rightSide = {
    initialAxis: { x, y },
    initialControlPoint: { x: 20, y: -20 },
    endingControlPoint: { x: 40, y: 10 },
    endingAxis: { x: 0, y: 40 },
  }

  return (
    <g filter="url(#shadow)">
      <path style={heartStyle} d={pathFromBezierCurve(leftSide)} />
      <path style={heartStyle} d={pathFromBezierCurve(rightSide)} />
    </g>
  )
}

Heart.propTypes = {
  position: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
}

export default Heart
