import React from 'react'
import { Box } from '@hackclub/design-system'
import LoadingAnimation from './LoadingAnimation'

const Base = Box.extend`
  position: relative;
`

const LoadingBar = props => (
  <Base py={5} {...props}>
    <LoadingAnimation />
  </Base>
)

export default LoadingBar
