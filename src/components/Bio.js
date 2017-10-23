import React from 'react'
import { Lead, Flex, Box, Text, Subhead, Avatar, Badge } from 'rebass'
import theme, { colors } from '../theme'

const Base = Box.extend.attrs({ bg: colors.blue[0], p: 3, my: 2 })`
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-column-gap: 1rem;
  border-radius: .5rem;
`
const Role = Badge.extend.attrs({
  f: 1,
  my: 0,
  px: 2,
  bg: 'muted',
  color: 'white'
})`
  font-weight: normal;
  text-transform: uppercase;
`

const Bio = ({ img, name, role, text }) => (
  <Base>
    <Avatar size={64} src={img} />
    <Box>
      <Flex align="center" wrap>
        <Subhead f={4} my={0} mr={2} children={name} />
        <Role px={2} children={role} />
      </Flex>
      <Text f={2} children={text} />
    </Box>
  </Base>
)

export default Bio
