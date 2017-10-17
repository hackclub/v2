import React from 'react'
import { Container, Flex, Box, Heading, Image } from 'rebass'
import Stat from './Stat'

const Base = Container.extend.attrs({ my: 5 })`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(4, 1fr);
  > :nth-child(1) {
    grid-column: 1 / span 3;
    grid-row: 1;
  }
  > :nth-child(2) {
    grid-column: 3 / span 2;
    grid-row: 2;
  }
  > :nth-child(3) {
    grid-column: 4;
    grid-row: 1;
    align-self: flex-end;
  }
  > :nth-child(4) {
    grid-column: 1 / span 2;
    grid-row: 2;
    align-self: flex-start;
  }
`

export default () => (
  <Base>
    <Image src="http://placebear.com/768/256" />
    <Image src="http://placebear.com/768/384" />
    <Heading color="primary" f={6}>
      Your club will be rad.
    </Heading>
    <Box>
      <Flex justify="flex-end" wrap>
        <Stat value={180} label="clubs" />
        <Stat value={13} label="countries" />
      </Flex>
      <Flex justify="flex-end" wrap>
        <Stat value={25} label="states" />
        <Stat value="2K+" label="members" />
      </Flex>
    </Box>
  </Base>
)
