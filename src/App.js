import React from 'react'
import {
  Provider,
  Banner,
  Heading,
  Badge,
  Lead,
  Container,
  Flex,
  Box,
  Text
} from 'rebass'
import Bar from './Bar'
import theme, { brand, grays } from './theme'
import { keys } from 'lodash'

const Swatch = Flex.extend.attrs({
  m: 2,
  p: 4,
  align: 'center',
  justify: 'center'
})`
  width: 8rem;
  height: 8rem;
  border-radius: 4px;
`

const App = () => (
  <Provider theme={theme}>
    <Banner bg="primary">
      <Flex align="flex-start">
        <Heading f={7} my={0} color="white">
          Hack Club
        </Heading>
        <Badge bg="primary" ml={0} f={3} children={2} />
      </Flex>
      <Lead f={5} color="snow">
        Let's go.
      </Lead>
    </Banner>
    <Container py={4} color="black" style={{ maxWidth: 56 * 16 }}>
      <Bar w={1 / 3} mb={3} />
      <Heading mt={3}>Colors</Heading>
      <Text>These are Hack Club's colors.</Text>
      <Flex mx={-2} mt={3} mb={4} wrap>
        {keys({ ...brand, ...grays }).map(key => (
          <Swatch
            key={key}
            bg={key}
            color={['white', 'snow', 'smoke'].includes(key) ? 'black' : 'white'}
            children={key}
          />
        ))}
      </Flex>
      <Bar w={1 / 3} />
    </Container>
  </Provider>
)

export default App
