import React from 'react'
import { Box, Loading } from '@hackclub/design-system'
import PropTypes from 'prop-types'

const Base = Box.extend`
  position: relative;
  ${props => props.fill && { height: '100vh' }};
`

const LoadingBar = props => (
  <Base py={5} {...props}>
    <Loading />
  </Base>
)

LoadingBar.propTypes = {
  fill: PropTypes.boolean
}

export default LoadingBar
