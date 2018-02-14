import React from 'react'
import { Box, Text, colors } from '@hackclub/design-system'

const trClickable = `
  box-shadow: 2px 0px 16px ${colors.gray[1]}, 0px 0px 1px 1px ${colors.gray[4]};
  z-index: 999;
`

export const Tr = Box.withComponent('tr').extend`
  cursor: ${props => (props.onClick ? 'pointer' : 'inherit')};
  &:nth-child(odd) {
    background-color: ${props => props.theme.colors.gray[0]};
  }
  &:hover {
    ${props => props.onClick && trClickable}
  }
`

export const TD = Text.withComponent('td').extend`
  overflow: auto;
  max-width: 16rem;
  a, span {
    display: block;
    text-align: center;
    margin: 0;
  }
`

export const Td = ({ children }) => (
  <TD px={[1, 2]} title={children}>
    {children || <Text color="muted" children="Unset" />}
  </TD>
)

export const Th = Text.withComponent('th').extend.attrs({
  bg: 'white',
  color: 'slate',
  align: 'left'
})`&:first-child { text-align: center; }`
