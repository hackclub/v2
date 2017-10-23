import React from 'react'
import { Container, Flex, Box, Heading, Image } from 'rebass'
import { mx } from '../theme'
import Stat from './Stat'

const Base = Container.extend.attrs({ maxWidth: 48 * 16 })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: -4rem;
  > div {
    border-radius: 9999px;
    flex: 1 1 auto;
  }
  > :first-child {
    padding: 2rem;
    text-align: center;
    z-index: 2;
  }
  > :last-child {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 3rem;
    margin-top: -2rem;
    z-index: 1;
  }
  ${mx[1]} {
    flex-direction: row;
    > :first-child {
    }
    > :last-child {
      margin-left: -2rem;
    }
  }
`

export default () => (
  <Base>
    <Flex align="center" justify="center" bg="primary">
      <Heading color="white" f={6}>We‘re making a movement.</Heading>
    </Flex>
    <Box bg="accent">
      <Stat value={180} label="clubs" />
      <Stat value={13} label="countries" />
      <Stat value={25} label="states" />
      <Stat value="2K+" label="members" />
    </Box>
  </Base>
)
