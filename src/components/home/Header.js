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
import styled from 'styled-components'
import { stats } from 'data.json'

const Root = Flex.withComponent('header').extend`
  text-align: center;
  background: #222 url('/map.svg') no-repeat;
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
  p {
    max-width: 46rem;
  }
`
Root.defaultProps = {
  py: [5, 6],
  align: 'center',
  justify: 'center',
  flexDirection: 'column'
}

const Wrapper = Container.withComponent(Flex)
Wrapper.defaultProps = {
  color: 'white',
  flexDirection: 'column',
  maxWidth: 48,
  px: [2, null, 0]
}

const Notification = Flex.withComponent(Link).extend`
  border-radius: ${({ theme }) => theme.radius};
  max-width: 36rem;
  background-color: rgba(255, 255, 255, 0.96875);
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

const HeaderStats = styled.ul`
margin-top: 0;
margin-left: -15px;
padding: 0;
display: inline;
`

const HeaderStat = Text.withComponent('li').extend.attrs({ f: [3, 4] })`
display: inline;
margin-left: 15px;

&:not(:last-child):after {
  line-height: 24px;
  margin-left: 10px;
  margin-right: -5px;
  font-size: 32px;
  content: "\00b7";
}
`

const Action = LargeButton.extend.attrs({ scale: true, m: [1, null, 2] })``
Action.link = Action.withComponent(Link)

export default () => (
  <Root>
    <Wrapper>
      <Notification to="/bank">
        <Icon size={24} color="slate" name="account_balance" mr={2} />
        <Flex color="black" f={1} mr={2}>
          <strong>Announcing Bank</strong>
          <Hide xs sm ml={1}>
            {'– '}
            a legal and finance backend for hackathons
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
      <HeaderStats>
        <HeaderStat>{stats.school_count} schools</HeaderStat>
        <HeaderStat>{stats.state_count} states</HeaderStat>
        <HeaderStat>{stats.country_count} countries</HeaderStat>
      </HeaderStats>
      <Text f={[3, 4]} mx="auto">
        Hack Club is a nonprofit network of computer science clubs where
        members learn to code through tinkering and building projects.
      </Text>
      <Flex
        justify="center"
        align="center"
        mx={[-1, -2]}
        mt={[3, 4]}
        flexDirection={[null, 'column-reverse', 'row']}
      >
        <Action.link to="/donate" bg="accent">
          Donate
        </Action.link>
        <Action.link to="/slack_invite" bg="info">
          Join the Slack
        </Action.link>
        <Action.link to="/start" f={[3, null, 4]}>
          Get Started »
        </Action.link>
      </Flex>
    </Wrapper>
  </Root>
)
