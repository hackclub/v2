import React from 'react'
import { Flex } from 'rebass'

const Section = Flex.extend.attrs({
  is: 'section',
  align: 'center',
  justify: 'center',
  direction: 'column',
  color: 'white',
  py: [4, 5],
  px: 3
})`text-align: center;`

export default Section

