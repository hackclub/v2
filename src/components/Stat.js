import React from 'react'
import { Box, Text } from '@hackclub/design-system'

const Base = Box.extend`
  display: inline-block;
  line-height: 1;
  p {
    opacity: 0.8;
  }
`

const Stat = ({ label, value, children, f = 7, ...props }) => (
  <Base my={1} w={128} align="center" {...props}>
    {children}
    <Text.span f={f} m={0} bold children={value} />
    {label && <Text f={2} m={0} caps children={label} />}
  </Base>
)

export default Stat
