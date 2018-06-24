import React from 'react'
import {
  Heading,
  Container,
  Box,
  Text,
  Section,
  Link as A
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Start from 'components/Start'
import Footer from 'components/Footer'

A.link = A.withComponent(Link)

const Header = Section.withComponent('header').extend`
  background-color: ${props => props.theme.colors.fuschia[6]};
  background-image: linear-gradient(
    32deg,
    ${props => props.theme.colors.fuschia[5]} 0%,
    ${props => props.theme.colors.red[5]} 64%,
    ${props => props.theme.colors.red[6]} 100%
  );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);
  > div { position: relative; }
`

const Seal = Box.extend`
  border-radius: 9999px;
  background-color: white;
  color: black;
  mix-blend-mode: screen;
  text-align: center;
  width: 12rem;
  height: 12rem;
  position: absolute;
  margin-top: -1rem;
  transform: rotate(3deg);
  ${props => props.theme.mediaQueries.md} {
    margin-top: -3rem;
  }
`

const HeadLine = Heading.h1.extend.attrs({ f: [5, 7, 8] })`
  line-height: 1.125 !important;
  text-transform: uppercase;
  &:nth-of-type(2) {
    padding-left: 1.5rem;
    ${props => props.theme.mediaQueries.md} {
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
      clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
      background-color: rgba(252, 252, 252, 0.625);
      mix-blend-mode: overlay;
      right: -0.5rem;
      width: 9.5rem;
      height: 2.5rem;
      ${props => props.theme.mediaQueries.sm} {
        width: 20rem;
        height: 5.5rem;
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
  ${props => props.theme.mediaQueries.md} {
    grid-template-columns: 2fr 3fr;
  }
`

const Super = Text.withComponent('mark').extend`
  background-color: ${props => props.theme.colors.warning};
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  color: ${props => props.theme.colors.white};
  display: inline-block;
  padding-bottom: ${props => props.theme.space[2]}px;
  padding-left: ${props => props.theme.space[3]}px;
  padding-right: ${props => props.theme.space[3]}px;
`

const title = 'Hack Club Philosophy'
const desc =
  'Read about Hack Club, a network of high school computer science clubs. ' +
  'We want to make building apps and websites accessible to everyone through programming clubs at every high school.'

export default () => (
  <Layout>
    <Helmet
      title={title}
      meta={[
        { name: 'twitter:title', content: title },
        { name: 'description', content: desc },
        { name: 'twitter:description', content: desc },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:url', content: 'https://hackclub.com/philosophy' }
      ]}
    />
    <Nav style={{ position: 'absolute', top: 0 }} />
    <Header pt={0}>
      <Container w={1} maxWidth={56} pt={4} pb={[4, 3]} px={3} align="left">
        <HeadLine children="We’re" />
        <HeadLine children="at our best" />
        <HeadLine children="when we’re" />
        <HeadLine children="making." />
        <Seal pt={[3, 4]}>
          <Text f={[1, 2]} caps>
            The Hack Club
          </Text>
          <Text f={[3, 4]} bold caps>
            Philosophy
          </Text>
        </Seal>
      </Container>
    </Header>
    <Row py={4}>
      <Heading.h2 f={[5, 6]} color="red.5">
        Coding is a <Super>superpower.</Super>
      </Heading.h2>
      <Text f={3}>
        Learning to code is uniquely like gaining a superpower: it converts you
        from a consumer to a creator. Suddenly, computers become a tool for
        creating.
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
      <Heading.h2 f={[5, 6]} color="violet.5">
        Hack, hack, hack.
      </Heading.h2>
      <Text f={3}>
        <strong>The goal of Hack Club is to help you become a hacker.</strong>{' '}
        We want a space at every school where people are making interesting
        things with code, every week. Schools don’t provide that, so we’re
        creating it in every school to make building things accessible to
        everyone.
      </Text>
    </Row>
    <Row py={4}>
      <Heading.h2 f={[5, 6]} color="indigo.5">
        Start building.
      </Heading.h2>
      <Text f={3}>
        Most coding classes teach you programming concepts instead of how to
        write real code—it’s like trying to learn carpentry without any wood. So
        at Hack Club, you learn to code entirely through building things. You
        start with no experience and build and ship a project every meeting.
      </Text>
    </Row>
    <Row py={4}>
      <Heading.h2 f={[5, 6]} color="blue.6">
        Learn as you build.
      </Heading.h2>
      <Text f={3}>
        Just as the best carpenters didn’t learn in the classroom, neither did
        the best programmers. Through our{' '}
        <A.link to="/workshops">workshops</A.link>, you’ll be walked through
        building projects. Starting out, you won’t understand how the code
        works, but you’ll build understanding as you go. You’ll get stuck along
        the way, but we’re here to help.
      </Text>
    </Row>
    <Row py={4}>
      <Heading.h2 f={[5, 6]} color="cyan.7">
        Be part of a community.
      </Heading.h2>
      <Text f={3}>
        Hack Club gives you a worldwide community of thousands of other young
        makers to talk to. We’re artists, writers, engineers, tinkerers,
        campers, filmmakers, volunteers. We make things. We help one another. We
        have fun. Join us.
      </Text>
    </Row>
    <Start mt={3} />
    <Footer />
  </Layout>
)
