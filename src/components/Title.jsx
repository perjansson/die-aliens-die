import React from 'react'
import { pathFromBezierCurve } from '../utils/formulas'

const Title = () => {
  const textStyle = {
    fontFamily: '"Poor Story", cursive',
    fontSize: 150,
    fontWeight: 700,
    letterSpacing: 6,
    fill: '#cbca62',
  }

  const aliensLineCurve = {
    initialAxis: {
      x: -330,
      y: -790,
    },
    initialControlPoint: {
      x: 230,
      y: -150,
    },
    endingControlPoint: {
      x: 285,
      y: 185,
    },
    endingAxis: {
      x: 775,
      y: -100,
    },
  }

  return (
    <g filter="url(#shadow)">
      <defs>
        <path id="AliensPath" d={pathFromBezierCurve(aliensLineCurve)} />
      </defs>
      <text {...textStyle}>
        <textPath xlinkHref="#AliensPath">Die Aliens Die!</textPath>
      </text>
    </g>
  )
}

export default Title
