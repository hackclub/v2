import React from 'react'
import styled from 'styled-components'
import {
  Container,
  Flex,
  Heading,
  Hide,
  Icon,
  LargeButton,
  Link as A,
  Text,
  theme
} from '@hackclub/design-system'
import Link from 'gatsby-link'
import Sheet from 'components/Sheet'
import { stats } from 'data.json'

const Root = styled(Flex.withComponent('section')).attrs({
  align: 'center',
  justify: 'center',
  flexDirection: 'column'
})`
  text-align: center;
  background: ${theme.colors.dark} url('/map.svg') no-repeat;
  background-size: cover;
  background-position: center top;
  max-width: 100%;

  p,
  h1,
  h2 {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
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

const Wrapper = styled(Container.withComponent(Flex)).attrs({
  color: 'white',
  flexDirection: 'column',
  maxWidth: 48,
  px: [2, null, 0],
  pt: [5, 6],
  pb: [4, 5]
})``

const Announcement = styled(Sheet).attrs({
  width: 1,
  maxWidth: 36,
  p: 2,
  px: [3, 2],
  mt: [null, -3, -4],
  mb: 3,
  color: 'slate'
})`
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderStats = styled(Text.withComponent('ul')).attrs({
  mt: 0,
  ml: -2,
  mb: [2, 3],
  p: 0
})`
  line-height: 1;
`

const HeaderStat = styled(Text.withComponent('li')).attrs({ f: [3, 4], ml: 2 })`
  display: inline;
  &:not(:last-child):after {
    position: relative;
    top: 2px;
    margin-left: ${theme.space[2]}px;
    margin-right: -2px;
    font-size: ${theme.fontSizes[5]}px;
    content: '\00b7';
  }
`

const Action = styled(LargeButton.withComponent(Link)).attrs({
  m: [1, null, 2],
  scale: true,
  py: 3,
  px: [3, 4],
  f: 2
})``
const DonateAction = styled(Action)`
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.lime[6]},
    ${theme.colors.teal[6]}
  );
  @media screen and (max-width: 512px) {
    display: none;
  }
`
const SlackAction = styled(Action)`
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.cyan[6]},
    ${theme.colors.blue[6]}
  );
`
const StartAction = styled(Action).attrs({ py: 3, px: 4 })`
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.orange[5]},
    ${theme.colors.red[5]}
  );
`

export default () => (
  <Root>
    <Wrapper>
      <Announcement>
        <Icon size={24} glyph="notification" color="slate" mr={1} />
        <Flex color="black" fontSize={1}>
          <strong>New for leaders!</strong>
          <Hide xs sm ml={1}>
            {'– '}
            get a subdomain for your club
          </Hide>
        </Flex>
        <A
          caps
          color="info"
          fontSize={2}
          px={2}
          bold
          ml="auto"
          to="https://leaders.hackclub.com/?ref=home"
          chevronRight
        >
          Learn more
        </A>
      </Announcement>
      <Text f={[3, 4]} mx="auto" mt={3} mb={0} caps>
        By the students, for the students.
      </Text>
      <Heading.h1 f={[6, 7, 8]} mx={[0, null, -3, -5]} mt={2} mb={3}>
        High school coding clubs.
      </Heading.h1>
      <HeaderStats>
        <HeaderStat>{stats.school_count} schools</HeaderStat>
        <HeaderStat>{stats.state_count} states</HeaderStat>
        <HeaderStat>{stats.country_count} countries</HeaderStat>
      </HeaderStats>
      <Text f={[3, 4]} mx="auto">
        Hack Club is a nonprofit network of computer science clubs where members
        learn to code through tinkering and building projects.
      </Text>
      <Flex justify="center" align="center" mx={[-1, -2]} mt={[3, 4]}>
        <DonateAction to="/donate" bg="teal.6">
          Donate
        </DonateAction>
        <SlackAction to="/slack_invite" bg="info">
          <Hide xs style={{ display: 'inline' }}>
            Join{' '}
          </Hide>
          Slack
        </SlackAction>
        <StartAction to="/start" f={[3, null, 4]} chevronRight>
          Get Started
        </StartAction>
      </Flex>
    </Wrapper>
  </Root>
)
