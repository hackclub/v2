import React from 'react'
import styled from 'styled-components'
import { Box, Text, theme } from '@hackclub/design-system'

const Tile = styled(Box).attrs({ p: 3 })`
  min-height: 32px;
`

const Name = styled(Text)``

export const Event = ({ start, name, length, color }) => (
  <li>
    <Text color="muted">{start}</Text>
    <Tile
      bg={`${color}.1`}
      color={`${color}.6`}
      style={{ height: length * 24 }}
    >
      <Name>{name}</Name>
    </Tile>
  </li>
)

const Calendar = styled(Box.withComponent('ol'))`
  display: grid;
  grid-template-columns: 1fr 2fr;
  li {
    border-top: 1px solid ${theme.colors.smoke};
  }
`

export default ({ events }) => (
  <Calendar>
    {events.map(event => (
      <Event {...event} />
    ))}
  </Calendar>
)
