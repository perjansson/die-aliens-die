import React from 'react'
import { shape, number } from 'prop-types'

import FlyingObjectBase from 'components/FlyingObjectBase'
import FlyingObjectTop from 'components/FlyingObjectTop'

const FlyingObject = ({ position }) => (
  <g>
    <FlyingObjectBase position={position} />
    <FlyingObjectTop position={position} />
  </g>
)

FlyingObject.propTypes = {
  position: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
}

export default FlyingObject
