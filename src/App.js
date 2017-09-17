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
  TabItem,
  Relative,
  Absolute,
  Image,
  Link,
  Row,
  Column
} from 'rebass'
import Bar from './Bar'
import Icon from './Icon'
import theme, { brand, grays, geo } from './theme'
import { keys } from 'lodash'

import Footer from './Footer'

const Flag = Image.extend`
  top: 0;
  left: 0;
  position: absolute;
  max-width: 14rem;
  padding-left: 1rem;
  z-index: 0;
`

const Hero = Banner.extend.attrs({ is: 'header', py: 6, px: 2 })`
  ${geo(brand.primary)}
`

const HeroContainer = Container.extend`
  max-width: 48rem;
  padding: 0;
  text-align: center;
  z-index: 1;
`

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
    <Hero>
      <Flag src="https://cdn.rawgit.com/hackclub/hackclub/629b7921/internals/logos/banner_orpheus_hand.svg" />
      <HeroContainer
        style={{ maxWidth: 48 * 16, textAlign: 'center', zIndex: 2 }}
      >
        <Heading f={[5, 6, 7]} my={0} color="white">
          Start an amazing coding club at your high school.
        </Heading>
        <Lead
          f={[3, 4]}
          color="snow"
          mt={3}
          mb={4}
          mx="auto"
          w={[1, 2 / 3]}
          style={{ lineHeight: 1.6 }}
        >
          Hack Club is the largest nonprofit network of student-led high school
          coding clubs.
        </Lead>
        <Flex justify="center" wrap>
          <Button bg="white" color="primary" f={4}>
            Start a Club
          </Button>
          <ButtonOutline bg="primary" color="white" f={4} ml={3}>
            Donate
          </ButtonOutline>
        </Flex>
      </HeroContainer>
    </Hero>
    <Container py={4} color="black" style={{ maxWidth: 56 * 16 }}>
      <Bar w={1 / 3} mt={0} mb={4} />
      {/* <Heading mt={3}>Colors</Heading>
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
      <Bar w={1 / 3} /> */}
    </Container>
    <Footer />
  </Provider>
)

export default App
