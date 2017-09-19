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
import Details from './Details'
import Stat from './Stat'
import theme, { brand, grays, geo, tilt, mx } from './theme'
import { keys } from 'lodash'

import Footer from './Footer'

const Flag = Box.extend`
  background: url(https://cdn.rawgit.com/hackclub/hackclub/629b7921/internals/logos/banner_orpheus_hand.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  z-index: 0;

  ${mx[0]} {
    background-origin: content-box;
    background-position: top left;
    padding-left: 1rem;
    height: 6rem;
  }
`

const Hero = Banner.extend.attrs({ is: 'header' })`
  ${geo(brand.primary)}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6rem;
  padding-bottom: 6rem;
  ${tilt(90)}
  ${mx[1]} {
    ${tilt(75)}
    padding-top: 4rem;
    padding-bottom: 8rem;
  }
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

const Headline = Heading.extend.attrs({
  f: [5, 6, 7],
  my: 0,
  color: 'white'
})`line-height: 1.1;`
const Subheadline = Lead.extend.attrs({
  f: [3, 4],
  mt: 3,
  mb: 4,
  mx: 'auto',
  w: [1, 2 / 3],
  color: 'snow'
})`line-height: 1.5;`

const App = () => (
  <Provider theme={theme}>
    <Hero>
      <Flag />
      <HeroContainer
        style={{ maxWidth: 48 * 16, textAlign: 'center', zIndex: 2 }}
      >
        <Headline>Start an amazing coding club at your high school.</Headline>
        <Subheadline>
          Hack Club is the largest nonprofit network of student-led high school
          coding clubs.
        </Subheadline>
        <Flex justify="center" wrap m={-2}>
          <Button
            is="a"
            href="https://hackclub.com/start"
            bg="white"
            color="primary"
            f={4}
            m={2}
          >
            Start a Club
          </Button>
          <ButtonOutline
            is="a"
            href="https://hackclub.com/donate"
            bg="primary"
            color="white"
            f={4}
            m={2}
          >
            Donate
          </ButtonOutline>
        </Flex>
      </HeroContainer>
    </Hero>
    <Container py={4} color="black" style={{ maxWidth: 56 * 16 }}>
      <Flex my={4} justify="center" mx={-3} wrap>
        <Stat value={163} label="clubs" />
        <Stat value={13} label="countries" />
        <Stat value={24} label="states" />
        <Stat value="2K+" label="members" />
      </Flex>
      {/* <Flex>
        <Image src="https://hackclub.com/staticPage/home/person_2-ca37a2607352f0f946f3f658dc304a0c.svg" />
        <Image src="https://hackclub.com/staticPage/home/person_1-50caa3ddfb0c690fdc3acdf94c0b29c1.svg" />
      </Flex> */}
      <Bar w={1 / 3} my={4} mx="auto" />
      <Details />
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
