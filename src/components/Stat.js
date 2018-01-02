import React from 'react'
import { Box, Text } from '@hackclub/design-system'

const Base = Box.extend`
  display: inline-block;
  line-height: 1;
  p {
    opacity: 0.8;
  }
`

const Stat = ({ label, value, children, ...props }) => (
  <Base my={1} w={128} color="white" align="center" {...props}>
    {children}
    <Text.span f={7} m={0} bold children={value} />
    {label && <Text f={2} m={0} caps children={label} />}
  </Base>
)

export default Stat
