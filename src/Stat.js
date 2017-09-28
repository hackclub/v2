import React from 'react'
import { Box, Lead, Text } from 'rebass'
import { url } from './Icon'
import { mx, geo, grays } from './theme'

const Base = Box.extend`text-align: center;`

const Number = Lead.extend.attrs({ f: 7, mb: 0, bold: true })`
  line-height: 1;
`

const Stat = ({ label, value, children, ...props }) => (
  <Base m={2} w={8 * 16} {...props}>
    {children}
    <Number children={value} />
    {label && <Text f={2} caps color="slate" children={label} />}
  </Base>
)

export default Stat
