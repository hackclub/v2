import React from 'react'
import { Flex, Box, Text } from '@hackclub/design-system'
import { map, sum, values, capitalize, round } from 'lodash'
import commaNumber from 'comma-number'

const segments = {
  salaries: 6000,
  hosting: 434.64,
  tools: 286.95,
  shipping: 16,
  transportation: 5
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
  background-image: linear-gradient(
    ${props => props.theme.colors.red[0]},
    ${props => props.theme.colors.red[2]}
  );
`

const Item = ({ label, value, ...props }) => (
  <Row mt={3}>
    <Bar
      py={3}
      aria-label={`${round(100 * (value / total))}%`}
      style={{ width: 256 * (value / total) }}
    />
    <Text.span f={1} bold color="white" ml={3}>
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
