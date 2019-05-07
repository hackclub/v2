import React from 'react'
import styled from 'styled-components'
import { Box, Text } from '@hackclub/design-system'
import { theme } from './style'

const Tile = styled(Box).attrs({ px: 2 })`
  display: flex;
  align-items: center;
  min-height: 24px;
`

export const Event = ({ start, name, length = 1, color = 'darkless' }) => (
  <li>
    <Text.span fontSize={1} p={1} color="muted">
      {start}
    </Text.span>
    <Tile
      bg={theme.colors.dark}
      // color="sm"
      style={{ height: 24 + length * 24 }}
    >
      <Text fontSize={2}>{name}</Text>
    </Tile>
  </li>
)

const Calendar = styled(Box.withComponent('ol'))`
  list-style: none;
  padding-left: 0;
  margin: 0;
  li {
    border-top: 1px solid ${theme.colors.darkless};
    break-inside: avoid;
    display: grid;
    grid-template-columns: 1fr 2fr;
    overflow: hidden;
    &:first-child {
      border-radius: 0 ${theme.radii[2]} 0 0;
    }
    &:last-child ${Tile} {
      border-radius: 0 0 ${theme.radii[2]} ${theme.radii[2]};
    }
  }
`

export default ({ events = [] }) => (
  <Calendar>
    {events.map(event => (
      <Event {...event} />
    ))}
  </Calendar>
)
