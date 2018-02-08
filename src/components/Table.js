import React from 'react'
import { Box, Text } from '@hackclub/design-system'

export const Tr = Box.withComponent('tr').extend`
  &:nth-child(odd) {
    background-color: ${props => props.theme.colors.gray[0]};
  }
`

const TD = Text.withComponent('td').extend`
  overflow: auto;
  max-width: 16rem;
  a, span {
    display: block;
    text-align: center;
    margin: 0;
  }
`

const Td = ({ children }) => (
  <TD px={[1, 2]} title={children}>
    {children || <Text color="muted" children="Unset" />}
  </TD>
)

const Th = Text.withComponent('th').extend.attrs({
  bg: 'white',
  color: 'slate'
})`&:first-child { text-align: center; }`

export default props => (
  <table>
    <thead>
      <Tr>
        {props.headers.map((header, index) => (
          <Th align="left" key={index}>
            {header}
          </Th>
        ))}
      </Tr>
    </thead>
    <tbody>
      {props.rows.map((row, rIndex) => (
        <Tr key={rIndex}>
          {props.headers.map((header, hIndex) => (
            <Td key={hIndex}>{row[header]}</Td>
          ))}
        </Tr>
      ))}
    </tbody>
  </table>
)
