import React from 'react'

import { skyAndGroundWidth, gameHeight } from '../utils/constants'

const skyStyle = {
  fill: '#30abef',
}

const skyWidth = skyAndGroundWidth

const Sky = () => (
  <rect
    style={skyStyle}
    x={skyWidth / -2}
    y={100 - gameHeight}
    width={skyWidth}
    height={gameHeight}
  />
)

export default Sky
