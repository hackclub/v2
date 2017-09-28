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
  Circle,
  Relative,
  Absolute,
  Image,
  Link,
  Row,
  Column
} from 'rebass'
import Bar from './Bar'
import Icon from './Icon'
import Bubbles from './Bubbles'
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
const Description = Lead.extend.attrs({ f: [4, 5], mb: 0 })`
  line-height: 1.5;
  /* max-width: 36rem; */
`

const Split = Row.extend.attrs({ mx: -3, my: 3, align: 'center' })`
  flex-flow: column wrap;

  ${mx[1]} {
    flex-flow: row nowrap;
  }

  > div {
    flex: 1 1 auto;
  }
`
const SplitWide = Column.extend`${mx[1]} {max-width: 60%;}`
const SplitNarrow = Flex.extend.attrs({ px: 3 })`${mx[1]} {max-width: 40%;}`

const BodyHeading = Heading.extend.attrs({
  is: 'h2',
  f: 5,
  mt: 4,
  mb: 2,
  color: 'primary'
})`line-height: 1.25;`
const BodySubhead = Subhead.extend.attrs({
  is: 'h3',
  f: [3, 4],
  mt: 0,
  mb: 1,
  color: 'silver'
})`
  font-weight: normal;
  line-height: 1.5;
`

const Placeholder = Circle.extend.attrs({ size: 256 })`
  ${geo(brand.info)}
`

const CTA = Button.extend.attrs({
  is: 'a',
  bg: 'primary',
  color: 'white',
  f: 4,
  py: 3,
  px: 4,
  my: 3
})`
  box-shadow: 0 0 8px rgba(0, 0, 0, .25);
  float: right;
  transition: .1s box-shadow ease-in-out;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, .25);
  }
`

const App = () => (
  <Provider theme={theme}>
    <Hero>
      <Flag />
      <HeroContainer
        style={{ maxWidth: 48 * 16, zIndex: 2, textAlign: 'center' }}
      >
        <Headline>Start an amazing coding club at your high school.</Headline>
        <Subheadline>
          Hack Clubs are places where students learn to make things with code
          together.
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
    <Container pt={3} pb={5} maxWidth={48 * 16} color="black">
      <Split>
        <SplitNarrow>
          <Bubbles />
        </SplitNarrow>
        <SplitWide>
          <BodyHeading>
            We’re a global community of people like you.
          </BodyHeading>
          <BodySubhead>
            We are thousands of students, hackers, helpers, and everyone in
            between.
          </BodySubhead>
        </SplitWide>
      </Split>
      <Split>
        <SplitWide>
          <BodyHeading>We’re starting a movement.</BodyHeading>
          <BodySubhead>
            Hack Club is the largest nonprofit network of student-led high
            school coding clubs.
          </BodySubhead>
        </SplitWide>
        <SplitNarrow>
          <Flex mx={-2} justify="center" wrap>
            <Stat value={180} label="clubs" />
            <Stat value={13} label="countries" />
            <Stat value={25} label="states" />
            <Stat value="2K+" label="members" />
          </Flex>
        </SplitNarrow>
      </Split>
      <Split>
        <SplitNarrow>
          <Flex align="center" justify="center">
            <Placeholder />
          </Flex>
        </SplitNarrow>
        <SplitWide>
          <BodyHeading>
            We’ve got everything you need for your club.
          </BodyHeading>
          <BodySubhead>Talk to our team for guidance anytime.</BodySubhead>
          <BodySubhead>Chat 24/7 with the community on Slack.</BodySubhead>
          <BodySubhead>Read our open source lesson plans.</BodySubhead>
          <BodySubhead>Get free stickers for your club.</BodySubhead>
        </SplitWide>
      </Split>
      <Split>
        <SplitWide>
          <BodyHeading f={6}>Start a Hack Club</BodyHeading>
          <BodySubhead>Build the class you wish you could take.</BodySubhead>
          <BodySubhead>Bring the movement to your school.</BodySubhead>
        </SplitWide>
        <SplitNarrow>
          <CTA href="https://hackclub.com/start">Start a Club »</CTA>
        </SplitNarrow>
      </Split>
    </Container>
    <Details />
    {/* <Bar w={1 / 3} my={4} mx="auto" /> */}
    <Footer />
  </Provider>
)

export default App
