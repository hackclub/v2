import styled from 'styled-components'
import React from 'react'
import { Box, Text, theme } from '@hackclub/design-system'

const trClickable = `
  box-shadow: 2px 0px 16px ${theme.colors.gray[1]}, 0px 0px 1px 1px ${
  theme.colors.gray[4]
};
`

export const Tr = styled(Box.withComponent('tr'))`
  cursor: ${props => (props.onClick ? 'pointer' : 'inherit')};
  &:nth-child(odd) {
    background-color: ${theme.colors.gray[0]};
  }
  &:hover {
    ${props => props.onClick && trClickable};
  }
`

export const TD = styled(Text.withComponent('td'))`
  overflow: auto;
  max-width: 16rem;
  a,
  span {
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

export const Th = styled(Text.withComponent('th')).attrs({
  bg: 'white',
  color: 'slate',
  align: 'left'
})`
  &:first-child {
    text-align: center;
  }
`
