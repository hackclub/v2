import React from 'react'
import Link from 'gatsby-link'
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  LargeButton
} from '@hackclub/design-system'
import Nav from 'components/Nav'
import Animator from 'components/Animator'

const Root = Box.withComponent('header').extend`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: ${props => props.theme.colors.blue[8]} url('/map.svg') no-repeat;
  background-size: cover;
  background-position: center top;
  max-width: 100%;
  overflow: hidden;
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0 95%);
  ${props => props.theme.mediaQueries.md} {
    clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0 90%);
  }

  p,
  h1,
  h2 {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.32);
  }
  p:first-child {
    line-height: 1.125;
  }
  h1 {
    line-height: 1;
  }
  h2 {
    line-height: 1.25;
  }

  @media screen and (max-width: 22em) {
    a span {
      display: none;
    }
  }
`

const Action = LargeButton.extend`
  transition: transform 0.125s ease-out;
  will-change: transform;
  transform: scale(1);
  &:hover,
  &:focus {
    transform: scale(1.06);
  }
  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`

Action.link = Action.withComponent(Link)

export default () => (
  <Animator
    is={Root}
    data={{
      opacity: [1, 0.75],
      transform: [{ translateY: '0px' }, { translateY: '-96px' }]
    }}
    px={[0, 3]}
  >
    <Nav style={{ position: 'absolute', top: 0 }} />
    <Container maxWidth={48} color="white" my={[5, 6]}>
      <Text f={[3, 4]} px={2} mx="auto" my={0} caps>
        By the students, for the students.
      </Text>
      <Heading.h1 f={[6, 7]} mx="auto" mt={2} mb={3}>
        High school coding clubs.
      </Heading.h1>
      <Text f={[3, 4]} mx="auto" m={0}>
        Hack Club is a nonprofit network of computer science clubs where members
        learn to code through tinkering and building projects.
      </Text>
      <Flex justify="center" align="center" mx={[-1, -2]} mt={[3, 4]}>
        <Action href="https://finder.hackclub.com" inverted m={[1, 2]}>
          Find <span>Nearby</span>
        </Action>
        <Action.link to="/start" m={[1, 2]} f={[3, 4]}>
          Start a Club »
        </Action.link>
      </Flex>
    </Container>
  </Animator>
)
