import React from 'react'
import { Flex, Box, Text, cx } from '@hackclub/design-system'
import { map, sum, values, capitalize, round } from 'lodash'
import commaNumber from 'comma-number'

const segments = {
  salaries: 6000,
  hosting: 434.64,
  tools: 286.95,
  shipping: 16,
  transportation: 5
}
const colors = {
  salaries: 'red',
  hosting: 'orange',
  tools: 'teal',
  shipping: 'blue',
  transportation: 'violet'
}
const total = sum(values(segments))

const Row = Flex.extend`
  align-items: center;

  span {
    flex: 1 1 auto;
  }
`

const Bar = Box.extend`
  border-radius: ${props => props.theme.radius};
  height: ${props => props.theme.space[4]}px;
  min-width: 1px;
`

const Item = ({ label, value, ...props }) => (
  <Row mt={3}>
    <Bar
      py={3}
      aria-label={`${round(100 * (value / total))}%`}
      style={{
        backgroundImage: `linear-gradient(90deg,
          ${cx(`${colors[label]}.4`)},
          ${cx(`${colors[label]}.5`)}
        )`,
        width: 256 * (value / total)
      }}
    />
    <Text.span f={1} bold color={`${colors[label]}.6`} ml={3}>
      {capitalize(label)}: {`$${commaNumber(round(value))}`}
    </Text.span>
  </Row>
)

const Spent = () => (
  <Box w={1}>
    {map(segments, (value, segment) => (
      <Item label={segment} key={segment} value={value} />
    ))}
  </Box>
)

export default Spent
