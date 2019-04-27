import React from 'react'
import styled from 'styled-components'
import { Box, Text, theme } from '@hackclub/design-system'

const Tile = styled(Box).attrs({ px: 2 })`
  display: flex;
  align-items: center;
  min-height: 24px;
`

export const Event = ({ start, name, length = 1, color = 'red' }) => (
  <li>
    <Text.span fontSize={1} p={1} color="muted">
      {start}
    </Text.span>
    <Tile bg={`${color}.0`} color="black" style={{ height: 24 + length * 24 }}>
      <Text fontSize={2}>{name}</Text>
    </Tile>
  </li>
)

const Calendar = styled(Box.withComponent('ol'))`
  list-style: none;
  padding-left: 0;
  ${theme.mediaQueries.md} {
    column-count: 2;
    column-gap: ${theme.space[4]}px;
  }
  li {
    border-top: 1px solid ${theme.colors.smoke};
    break-inside: avoid;
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`

export default ({ events = [] }) => (
  <Calendar>
    {events.map(event => (
      <Event {...event} />
    ))}
  </Calendar>
)
