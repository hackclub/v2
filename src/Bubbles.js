import React from 'react'
import { Avatar, Flex, Box } from 'rebass'
import { random, sample } from 'lodash'
import { mx, geo, grays } from './theme'
import avatars from './avatar'

const Bubbles = () => (
  <Flex align="center" wrap style={{ position: 'relative' }}>
    {avatars.map(url => (
      <Avatar
        size={sample([16, 32, 48, 64])}
        key={url}
        src={url}
        m={sample([1, 2])}
        style={{
          position: 'absolute',
          top: random(12, 768),
          right: random(0, 100) + 'vw'
        }}
      />
    ))}
  </Flex>
)

export default Bubbles
