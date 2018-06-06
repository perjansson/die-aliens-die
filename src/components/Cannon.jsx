import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import CannonPipe from './CannonPipe'
import CannonBase from './CannonBase'

const Cannon = props => (
  <Fragment>
    <CannonPipe {...props} />
    <CannonBase />
  </Fragment>
)

Cannon.propTypes = {
  rotation: PropTypes.number.isRequired,
}

export default Cannon
