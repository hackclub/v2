import React from 'react'
import { Box, Text } from 'rebass'

const Base = Box.extend.attrs({ my: 1, w: 128 })`
  display: inline-block;
  text-align: center;
`

const Number = Text.extend.attrs({ is: 'span', color: 'white', f: 7 })`
  font-weight: bold;
  line-height: 1;
`
const Description = Text.extend.attrs({
  color: 'white',
  f: 2,
  caps: true
})`opacity: .8;`

const Stat = ({ label, value, children, ...props }) => (
  <Base {...props}>
    {children}
    <Number children={value} />
    {label && <Description children={label} />}
  </Base>
)

export default Stat
