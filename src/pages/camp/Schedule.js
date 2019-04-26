import React from 'react'
import styled from 'styled-components'
import { Box, Text, theme } from '@hackclub/design-system'

const Tile = styled(Box).attrs({ p: 3 })`
  display: flex;
  align-items: center;
  min-height: 24px;
`

const Name = styled(Text)``

export const Event = ({ start, name, length = 1, color = 'red' }) => (
  <li>
    <Text color="muted">{start}</Text>
    <Tile bg={`${color}.0`} color="black" style={{ height: 24 + length * 24 }}>
      <Name>{name}</Name>
    </Tile>
  </li>
)

const Calendar = styled(Box.withComponent('ol'))`
  list-style: none;
  padding-left: 0;
  li {
    border-top: 1px solid ${theme.colors.smoke};
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`

export default ({ events }) => (
  <Calendar>
    {events.map(event => (
      <Event {...event} />
    ))}
  </Calendar>
)
