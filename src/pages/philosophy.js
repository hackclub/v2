import React from 'react'
import styled from 'styled-components'
import {
  Heading,
  Container,
  Box,
  Text,
  Section,
  Link as A,
  theme
} from '@hackclub/design-system'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import Nav from 'components/Nav'
import { Headline, Lead } from 'components/Content'
import Start from 'components/Start'
import Footer from 'components/Footer'

A.link = A.withComponent(Link)

const Header = styled(Section.withComponent('header')).attrs({
  bg: 'fuschia.6'
})`
  background-image: linear-gradient(
    32deg,
    ${theme.colors.fuschia[5]} 0%,
    ${theme.colors.red[5]} 64%,
    ${theme.colors.red[6]} 100%
  );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);
  > div {
    position: relative;
  }
`

const Seal = styled(Box)`
  border-radius: 9999px;
  background-color: white;
  color: black;
  mix-blend-mode: screen;
  text-align: center;
  width: 12rem;
  height: 12rem;
  position: absolute;
  margin-top: -1rem;
  transform: rotate(4deg);
  ${theme.mediaQueries.sm} {
    transform: rotate(3deg);
    margin-top: -3rem;
  }
`

const Ultraline = styled(Heading.h1).attrs({
  fontSize: [5, 7, 8, 9],
  color: 'white',
  caps: true
})`
  line-height: 1.125 !important;
  &:nth-of-type(2) {
    padding-left: 1.5rem;
    ${theme.mediaQueries.md} {
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
      ${theme.mediaQueries.sm} {
        width: 20rem;
        height: 5.5rem;
      }
    }
  }
`

const Row = styled(Container).attrs({ px: 3, py: [4, 5], color: 'black' })`
  display: grid;
  text-align: left;
  h2 {
    line-height: 1;
    margin-bottom: ${theme.space[3]}px;
  }
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[4]}px;
    grid-template-columns: 2fr 3fr;
  }
`

const Super = styled(Text.withComponent('mark'))`
  background-color: ${theme.colors.warning};
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  color: ${theme.colors.white};
  display: inline-block;
  padding-bottom: ${theme.space[2]}px;
  padding-left: ${theme.space[3]}px;
  padding-right: ${theme.space[3]}px;
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
    <Nav />
    <Header>
      <Container width={1} maxWidth={56} py={[6]} px={3} align="left">
        <Ultraline children="We’re" />
        <Ultraline children="at our best" />
        <Ultraline children="when we’re" />
        <Ultraline children="making." />
        <Seal pt={[3, 4]}>
          <Text fontSize={[1, 2]} caps>
            The Hack Club
          </Text>
          <Text fontSize={[3, 4]} bold caps>
            Philosophy
          </Text>
        </Seal>
      </Container>
    </Header>
    <Row py={4} mt={[0, 4]}>
      <Headline color="red.5">
        Coding is a <Super>superpower.</Super>
      </Headline>
      <Lead>
        Learning to code is uniquely like gaining a superpower: it converts you
        from a consumer to a creator. Suddenly, computers become a tool for
        creating.
      </Lead>
    </Row>
    <Row>
      <Headline color="fuschia.5">Make, from anywhere.</Headline>
      <Lead>
        There’s never been a better time for making: anywhere in the world,
        anyone with a laptop and an internet connection can learn to make an
        app. Building things has never been so globally democratized.
      </Lead>
    </Row>
    <Row>
      <Headline color="violet.5">Hack, hack, hack.</Headline>
      <Lead>
        <strong>The goal of Hack Club is to help you become a hacker.</strong>{' '}
        We want a space at every school where people are making interesting
        things with code, every week. Schools don’t provide that, so we’re
        creating it in every school to make building things accessible to
        everyone.
      </Lead>
    </Row>
    <Row>
      <Headline color="indigo.5">Start building.</Headline>
      <Lead>
        Most coding classes teach you programming concepts instead of how to
        write real code—it’s like trying to learn carpentry without any wood. So
        at Hack Club, you learn to code entirely through building things. You
        start with no experience and build and ship a project every meeting.
      </Lead>
    </Row>
    <Row>
      <Headline color="blue.6">Learn as you build.</Headline>
      <Lead>
        Just as the best carpenters didn’t learn in the classroom, neither did
        the best programmers. Through our{' '}
        <A.link to="/workshops">workshops</A.link>, you’ll be walked through
        building projects. Starting out, you won’t understand how the code
        works, but you’ll build understanding as you go. You’ll get stuck along
        the way, but we’re here to help.
      </Lead>
    </Row>
    <Row>
      <Headline color="cyan.7">Be part of a community.</Headline>
      <Lead>
        Hack Club gives you a worldwide community of thousands of other young
        makers to talk to. We’re artists, writers, engineers, tinkerers,
        campers, filmmakers, volunteers. We make things. We help one another. We
        have fun. Join us.
      </Lead>
    </Row>
    <Start mt={3} />
    <Footer mt={5} />
  </Layout>
)
