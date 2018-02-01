import React from 'react'
import { Box, Text } from '@hackclub/design-system'

export const Tr = Box.withComponent('tr').extend`
  &:nth-child(even) {
    background: ${props => props.theme.colors.snow};
  }
`

const Td = ({ children }) => (
  <td title={children} style={{ maxWidth: '15rem' }}>
    <Text color={children ? 'black' : 'silver'} style={{ overflow: 'auto' }}>
      {children || 'Unset'}
    </Text>
  </td>
)

export default props => (
  <table>
    <thead>
      <Tr>
        {props.headers.map((header, index) => (
          <th align="left" key={index}>
            {header}
          </th>
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
