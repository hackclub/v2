import React from 'react'
import styled from 'styled-components'
import { Flex, Box, Text, theme, cx } from '@hackclub/design-system'
import { map, sum, values, capitalize, round } from 'lodash'
import commaNumber from 'comma-number'

const segments = {
  marketing: 0,
  administration: 134.85,
  program: 6607.74
}
const colors = {
  marketing: 'green',
  administration: 'red',
  program: 'blue'
}
const total = sum(values(segments))

const Row = styled(Flex)`
  align-items: center;

  span {
    flex: 1 1 auto;
    line-height: 1.25;
  }
`

const Bar = styled(Box)`
  border-radius: ${theme.radius};
  height: ${theme.space[4]}px;
  min-width: 1px;
`

const Item = ({ label, value, ...props }) => (
  <Row mt={3}>
    <Bar
      py={3}
      aria-label={`${round(100 * (value / total))}%`}
      style={{
        backgroundImage: `radial-gradient(ellipse farthest-corner at top left,
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
