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
import theme, { brand, grays, geo, wk, mx, mm } from './theme'
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

const tilt = n =>
  wk(`clip-path: polygon(${n}% 0%, 100% 0, 100% ${n}%, 0 100%, 0 0);`)
const Hero = Banner.extend.attrs({ is: 'header' })`
  ${geo(brand.primary)}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  padding-bottom: 5rem;
  min-height: 50vh;
  ${tilt(90)}
  ${mx[1]} {
    ${tilt(85)}
    min-height: 70vh;
    padding-bottom: 8rem;
  }
`

const HeroContainer = Container.extend`
  max-width: 48rem;
  padding: 0;
  text-align: center;
  z-index: 1;
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
const Description = Lead.extend.attrs({ f: [4, 5], mx: 'auto', mb: 0 })`
  line-height: 1.3;
  max-width: 36rem;
  text-align: center;
`

const Features = Flex.extend.attrs({
  align: 'center',
  justify: 'center',
  mx: [-3, -4]
})``
const FeatureHuman = Image.extend.attrs({
  w: [1 / 4, 'auto'],
  mx: [3, 4]
})`
  line-height: .7;
  ${mm[1]} {
    &:last-of-type { display: none; }
  }
`
const FeatureList = Box.extend.attrs({ is: 'ul', pl: 0, pr: [2, 4] })`
  list-style: none;
`
const Feature = Text.extend.attrs({
  is: 'li',
  f: 4,
  mt: 0,
  mb: 1,
  bold: true
})``

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
    <Container pt={3} pb={5} color="black">
      <Description>
        Hack Clubs are places where students learn to make things with code
        together.
      </Description>
      <Flex my={3} mx={-3} justify="center" wrap>
        <Stat value={180} label="clubs" />
        <Stat value={13} label="countries" />
        <Stat value={25} label="states" />
        <Stat value="2K+" label="members" />
      </Flex>
      <Features>
        <FeatureHuman src="https://hackclub.com/staticPage/home/person_5-ed9941eca0249eb215bb44c8c74577eb.svg" />
        <FeatureList>
          {[
            'Student-led',
            'High school clubs',
            'Global community',
            'Leadership training',
            'Open source + transparent'
          ].map((a, i) => <Feature key={`feat-${i}`} children={a} />)}
        </FeatureList>
        <FeatureHuman src="https://hackclub.com/staticPage/home/person_3-abb269f6c0c1cc6d2b4618239db0c148.svg" />
      </Features>
    </Container>
    <Details />
    <Bar w={1 / 3} my={4} mx="auto" />
    <Footer />
  </Provider>
)

export default App
