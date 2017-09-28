import React from 'react'
import Typing from './Typing'
import { Avatar, Flex, Box } from 'rebass'
import { shuffle, random, sample, flatten } from 'lodash'

const ids = [
  'T0266FRGM-U0266FRGP-bfe9aa82f6b1',
  'T0266FRGM-U3XP4M6AZ-ge5279a5d1f3',
  'T0266FRGM-U3SLX4213-8b7da8568d4a',
  'T0266FRGM-U0C7B14Q3-181d8bae46ac',
  'T0266FRGM-U384YTXBR-0c30854b857e',
  'T0266FRGM-U2ZJX2AF4-d880e11ad5b2',
  'T0266FRGM-U39DWA80Z-546bccf7d5c8',
  'T0266FRGM-U0C7BTKLG-495da59309d6',
  'T0266FRGM-U2FJ82L22-bf6db1c487c3',
  'T0266FRGM-U3X783S30-8d8b45025871',
  'T0266FRGM-U3XRNJG5Q-2a6945374437'
]

const Bubble = ({ src, ...props }) => (
  <Avatar size={sample([32, 48, 64, 96])} src={src} m={2} />
)

const Bubbles = props => (
  <Flex align="center" justify="center" wrap {...props}>
    {ids.map(id => (
      <Bubble
        src={`https://ca.slack-edge.com/${id}-128`}
        key={`bubble-${id}`}
      />
    ))}
    <Typing />
  </Flex>
)

export default Bubbles
