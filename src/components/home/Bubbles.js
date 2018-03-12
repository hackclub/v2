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

const Root = Flex.extend`
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

  a {
    transition: transform 0.125s ease-out;
    transform: scale(1);
    &:hover {
      transform: scale(1.06);
    }
  }
  @media screen and (max-width: 22em) {
    a span {
      display: none;
    }
  }
`

LargeButton.link = LargeButton.withComponent(Link)

const Bubbles = () => (
  <Root justify="center" align="center" py={[5, 6]} px={[0, 3]}>
    <Container maxWidth={48} color="white">
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
        <LargeButton href="https://finder.hackclub.com" inverted m={[1, 2]}>
          Find <span>Nearby</span>
        </LargeButton>
        <LargeButton.link to="/start" m={[1, 2]} f={[3, 4]}>
          Start a Club »
        </LargeButton.link>
      </Flex>
    </Container>
  </Root>
)

export default Bubbles
