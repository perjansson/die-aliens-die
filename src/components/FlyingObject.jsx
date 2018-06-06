import React from 'react'
import { shape, number } from 'prop-types'
import styled, { keyframes } from 'styled-components'

import { gameHeight } from 'utils/constants'
import FlyingObjectBase from 'components/FlyingObjectBase'
import FlyingObjectTop from 'components/FlyingObjectTop'

const moveVertically = keyframes`
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(${gameHeight}px);
    }
`

const Move = styled.g`
  animation: ${moveVertically} 4s linear;
`

const FlyingObject = ({ position }) => (
  <Move>
    <FlyingObjectBase position={position} />
    <FlyingObjectTop position={position} />
  </Move>
)

FlyingObject.propTypes = {
  position: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
}

export default FlyingObject
