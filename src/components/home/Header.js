import React from 'react'
import Link from 'gatsby-link'
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Hide,
  Icon,
  Button,
  LargeButton
} from '@hackclub/design-system'
import Nav from 'components/Nav'
import Animator from 'components/Animator'

const Root = Flex.withComponent('header').extend`
  text-align: center;
  background: ${({ theme }) => theme.colors.blue[8]} url('/map.svg') no-repeat;
  background-size: cover;
  background-position: center top;
  max-width: 100%;
  overflow: hidden;
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0 95%);
  ${({ theme }) => theme.mediaQueries.md} {
    clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0 90%);
  }

  p,
  h1,
  h2 {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.375);
  }
  p,
  h2 {
    line-height: 1.25;
  }
  h1 {
    line-height: 1;
  }

  @media screen and (max-width: 22em) {
    a span {
      display: none;
    }
  }
`
Root.defaultProps = {
  py: [5, 6],
  align: 'center',
  justify: 'center',
  flexDirection: 'column'
}

const Base = Container.withComponent(Flex)
Base.defaultProps = {
  color: 'white',
  flexDirection: 'column',
  maxWidth: 48,
  px: [2, null, 0]
}

const Notification = Flex.withComponent(Link).extend`
  border-radius: ${({ theme }) => theme.radius};
  max-width: 36rem;
  background-color: ${({ theme }) => theme.colors.snow};
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background-color: rgba(255, 255, 255, 0.85);
    -webkit-backdrop-filter: saturate(200%) blur(12px);
  }
  ${({ theme }) => theme.mediaQueries.reduceTransparency} {
    -webkit-backdrop-filter: auto !important;
  }
  strong {
    font-weight: bold;
  }
`
Notification.defaultProps = {
  w: 1,
  py: 2,
  px: [3, 2],
  mt: [null, -3, -4],
  mb: 3,
  mx: 'auto',
  align: 'center',
  justify: 'center'
}

const Action = LargeButton.extend.attrs({ scale: true, m: [1, null, 2] })``
Action.link = Action.withComponent(Link)

export default () => (
  <Animator
    is={Root}
    data={{
      opacity: [1, 0.75],
      transform: [{ translateY: '0px' }, { translateY: '-96px' }]
    }}
  >
    <Nav style={{ position: 'absolute', top: 0 }} />
    <Base>
      <Notification to="/bank">
        <Icon size={24} color="slate" name="account_balance" mr={2} />
        <Flex color="black" f={1} mr={2}>
          <strong>Announcing Bank</strong>
          <Hide xs sm ml={1}>
            {'– '}
            the place for student hackers to store money
          </Hide>
        </Flex>
        <Text.span caps color="info" f={1} ml="auto">
          Learn more
        </Text.span>
      </Notification>
      <Text f={[3, 4]} mx="auto" mt={3} mb={0} caps>
        By the students, for the students.
      </Text>
      <Heading.h1 f={[6, 7]} mx="auto" mt={2} mb={3}>
        High school coding clubs.
      </Heading.h1>
      <Text f={[3, 4]} mx="auto" m={0}>
        Hack Club is the world’s largest nonprofit network of computer science
        clubs where members learn to code through tinkering and building
        projects.
      </Text>
      <Flex
        justify="center"
        align="center"
        mx={[-1, -2]}
        mt={[3, 4]}
        flexDirection={['column-reverse', null, 'row']}
      >
        <Action.link to="/donate" bg="info">
          Donate
        </Action.link>
        <Flex flexDirection="row" align="center">
          <Action href="https://finder.hackclub.com" inverted>
            Find <span>Nearby</span>
          </Action>
          <Action.link to="/start" f={[3, null, 4]}>
            Start a Club »
          </Action.link>
        </Flex>
      </Flex>
    </Base>
  </Animator>
)
