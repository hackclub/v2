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
  Text,
  Subhead,
  Button,
  ButtonOutline,
  Label,
  Input,
  Tabs,
  TabItem
} from 'rebass'
import Bar from './Bar'
import theme, { brand, grays } from './theme'
import { keys } from 'lodash'

const Swatch = Flex.extend.attrs({
  m: 2,
  p: 4,
  column: true,
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
      <Bar w={1 / 3} mt={0} mb={4} />
      <Heading mt={3}>Colors</Heading>
      <Text>These are Hack Club's colors.</Text>
      <Flex mx={-2} mt={3} mb={4} wrap>
        {keys({ ...brand, ...grays }).map(key => (
          <Swatch
            key={key}
            bg={key}
            color={['white', 'snow', 'smoke'].includes(key) ? 'black' : 'white'}
          >
            <Text f={2} bold>
              {key}
            </Text>
            <Text f={0}>{theme.colors[key]}</Text>
          </Swatch>
        ))}
      </Flex>
      <Bar w={1 / 3} my={4} />
      <Heading mt={4}>Elements</Heading>
      <Subhead mt={4} mb={2}>
        Buttons
      </Subhead>
      <Flex wrap>
        <Button bg="primary" mr={2}>
          Primary
        </Button>
        <ButtonOutline color="muted" mr={2}>
          Muted
        </ButtonOutline>
      </Flex>
      {/* <Subhead mt={4} mb={2}>
        Forms
      </Subhead>
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Zach Latta" /> */}
      <Subhead mt={4} mb={2}>
        Tabs
      </Subhead>
      <Tabs w={1 / 3}>
        <TabItem active>Zach</TabItem>
        <TabItem>Max</TabItem>
        <TabItem>Harrison</TabItem>
      </Tabs>
      <Bar w={1 / 3} />
    </Container>
  </Provider>
)

export default App
