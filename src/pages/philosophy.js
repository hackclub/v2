import React from 'react'
import {
  ThemeProvider,
  Heading,
  Container,
  Flex,
  Box,
  Text,
  Section,
  Card,
  Link as A,
  mediaQueries
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Start from 'components/Start'
import Footer from 'components/Footer'

const Header = Section.withComponent('header').extend`
  background-color: ${props => props.theme.colors.fuschia[6]};
  background-image: linear-gradient(
    32deg,
    ${props => props.theme.colors.fuschia[5]} 0%,
    ${props => props.theme.colors.red[5]} 64%,
    ${props => props.theme.colors.red[6]} 100%
  );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);
`

const HeadLine = Heading.h1.extend.attrs({ f: [5, 7, 8] })`
  line-height: 1.125 !important;
  text-transform: uppercase;
  ${mediaQueries[1]} {
    &:nth-of-type(2) {
      padding-left: 6rem;
    }
  }
  &:nth-of-type(3) {
    text-align: center;
  }
  &:nth-of-type(4) {
    text-align: right;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      border-radius: 9999px;
      background-color: rgba(252,252,252,.6);
      mix-blend-mode: overlay;
      right: 4rem;
      width: 5rem;
      height: 2.25rem;
      ${mediaQueries[0]} {
        right: 6rem;
        width: 14rem;
        height: 6rem;
      }
    }
  }
`

const Row = Container.extend.attrs({ px: 3, maxWidth: 56 })`
  display: grid;
  grid-gap: ${props => props.theme.space[3]}px;
  text-align: left;
  h2 {
    line-height: 1;
  }
  ${mediaQueries.md} {
    grid-template-columns: repeat(5, 1fr);
    > :first-child {
      grid-column: span 2;
    }
    > :last-child {
      grid-column: 3 / span 3;
    }
  }
`

const Super = Text.withComponent('mark').extend`
  background-color: ${props => props.theme.colors.violet[5]};
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  color: ${props => props.theme.colors.white};
  display: inline-block;
  padding-bottom: ${props => props.theme.space[2]}px;
  padding-left: ${props => props.theme.space[3]}px;
  padding-right: ${props => props.theme.space[3]}px;
`

export default () => (
  <ThemeProvider>
    <Helmet title="Philosophy – Hack Club" />
    <Nav style={{ position: 'absolute', top: 0 }} />
    <Header p={0} mb={3}>
      <Heading.h1 my={4} caps>
        <Text f={[2, 3]} regular>
          The Hack Club
        </Text>
        <Text f={[3, 4]}>Philosophy</Text>
      </Heading.h1>
      <Container w={1} maxWidth={56} mb={3} px={3} align="left">
        <HeadLine children="We’re" />
        <HeadLine children="best" />
        <HeadLine children="when we’re" />
        <HeadLine children="making." />
      </Container>
    </Header>
    <Row py={4}>
      <Heading.h2 f={[5, 6]} color="primary">
        Coding is a <Super>superpower.</Super>
      </Heading.h2>
      <Text f={3}>
        Coding is a uniquely empowering skill. We want what was “computer
        science” to be an accessible tool for everyone to make.
      </Text>
    </Row>
    <Row py={4}>
      <Heading.h2 f={[5, 6]} color="fuschia.5">
        Make, from anywhere.
      </Heading.h2>
      <Text f={3}>
        There’s never been a better time for making: anywhere in the world,
        anyone with a laptop and an internet connection can learn to make an
        app. Building things has never been so globally democratized.
      </Text>
    </Row>
    <Row py={4}>
      <Heading.h2 f={[5, 6]} color="accent">
        Learn as you build.
      </Heading.h2>
      <Text f={3}>
        Traditional computer science classes focus on programming concepts
        instead of shipping real projects. At Hack Clubs, members make projects
        make projects every day, learning new things as they build.
      </Text>
    </Row>
    <Row py={4}>
      <Heading.h2 f={[5, 6]} color="info">
        Be part of a community.
      </Heading.h2>
      <Text f={3}>
        Hack Club gives you a worldwide community of thousands of other young
        makers. We’re artists, engineers, tinkerers, writers, runners, campers,
        filmmakers, volunteers. We make things. We have fun. Join us.
      </Text>
    </Row>
    <Start mt={3} />
    <Footer />
  </ThemeProvider>
)
