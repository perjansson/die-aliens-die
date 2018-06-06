import React from 'react'
import { number } from 'prop-types'

const CurrentScore = ({ score }) => {
  const scoreStyle = {
    fontFamily: '"Poor Story", cursive',
    fontSize: 80,
    fontWeight: 700,
    fill: '#d6d33e',
  }

  return (
    <g filter="url(#shadow)">
      <text style={scoreStyle} x="300" y="75">
        {score}
      </text>
    </g>
  )
}

CurrentScore.propTypes = {
  score: number.isRequired,
}

export default CurrentScore
