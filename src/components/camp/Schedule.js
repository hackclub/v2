import React from 'react'
import styled from 'styled-components'
import { Box, Text } from '@hackclub/design-system'
import { theme } from './style'

const Label = styled(Text.span).attrs({ fontSize: 1, p: 1, color: 'muted' })`
  border-top: 1px solid ${theme.colors.darkless};
`

const Tile = styled(Box).attrs({ bg: theme.colors.darkless, px: 2 })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 24px;
  border-top: 1px solid ${theme.colors.dark};
`

const Calendar = styled(Box.withComponent('ol'))`
  list-style: none;
  padding-left: 0;
  margin: 0;
  li {
    break-inside: avoid;
    display: grid;
    grid-template-columns: 1fr 2fr;
    overflow: hidden;
    &:first-child {
      border-radius: 0 ${theme.radii[2]} 0 0;
      div {
        border-top: 0;
        padding-top: 1px;
      }
    }
    &:last-child ${Tile} {
      border-radius: 0 0 ${theme.radii[2]} ${theme.radii[2]};
    }
  }
`

const Event = ({ start, name, desc, length = 1, color = 'smoke' }) => (
  <li>
    <Label>{start}</Label>
    <Tile style={{ height: 32 + length * 24 }}>
      <Text fontSize={2} color={theme.colors[color]}>
        {name}
      </Text>
      {desc && <Text color="muted" fontSize={1} children={desc} />}
    </Tile>
  </li>
)

export default ({ events = [] }) => (
  <Calendar>
    {events.map((event) => (
      <Event {...event} />
    ))}
  </Calendar>
)
