import React from 'react'
import { Avatar, Flex, Box } from 'rebass'
import { random, sample } from 'lodash'

const Bubble = ({ src, ...props }) => (
  <Avatar size={sample([32, 48, 64, 96])} src={src} m={2} />
)

const ids = [
  'T0266FRGM-U0266FRGP-bfe9aa82f6b1',
  'T0266FRGM-U3XP4M6AZ-ge5279a5d1f3',
  'T0266FRGM-U3SLX4213-8b7da8568d4a',
  'T0266FRGM-U0C7B14Q3-181d8bae46ac',
  'T0266FRGM-U384YTXBR-0c30854b857e'
]

const Bubbles = props => (
  <Flex align="center" justify="center" {...props}>
    {ids.map(id => (
      <Bubble
        src={`https://ca.slack-edge.com/${id}-128`}
        key={`bubble-${id}`}
      />
    ))}
  </Flex>
)

export default Bubbles
