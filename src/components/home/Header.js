import React from 'react'
import styled from 'styled-components'
import {
  Container,
  Flex,
  Heading,
  Icon,
  LargeButton,
  Link as A,
  Text,
  theme
} from '@hackclub/design-system'
import { Link } from 'gatsby'
import Sheet from 'components/Sheet'
import { stats } from 'data.json'

const Root = styled(Flex.withComponent('section')).attrs({
  align: 'center',
  justify: 'center',
  flexDirection: 'column'
})`
  text-align: center;
  background-color: ${theme.colors.dark};
  background-image: url('/map.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  max-width: 100%;
  p,
  h1,
  h2 {
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  }
  p,
  h2 {
    line-height: 1.25;
  }
  h1 {
    line-height: 1;
  }
  p {
    max-width: 36rem;
  }
  ${theme.mediaQueries.sm} {
    br {
      display: none;
    }
  }
`

const Wrapper = styled(Container.withComponent(Flex)).attrs({
  color: 'white',
  flexDirection: 'column',
  maxWidth: 48,
  px: [2, null, 0],
  pt: [6, 7],
  pb: [4, 5, 6]
})``

const Announcement = styled(Sheet).attrs({
  width: 1,
  maxWidth: 36,
  p: 2,
  mt: [null, -3, -4],
  mb: 3,
  color: 'slate'
})`
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    text-shadow: none;
  }
  span {
    display: none;
    ${theme.mediaQueries.sm} {
      display: inline;
    }
  }
`
Announcement.Link = styled(A.withComponent(Link)).attrs({
  caps: true,
  color: 'info',
  bold: true,
  fontSize: 2,
  ml: 'auto',
  chevronRight: true
})``

const Stats = styled(Text.withComponent('ul')).attrs({
  color: 'blue.1',
  mt: 0,
  ml: -2,
  mb: [2, 3],
  p: 0
})`
  line-height: 1;
`
Stats.Stat = styled(Text.withComponent('li')).attrs({
  fontSize: [2, 3],
  ml: 2
})`
  display: inline;
  &:not(:last-child):after {
    content: '\00b7';
    position: relative;
    top: 6px;
    margin-left: ${theme.space[2]}px;
    margin-right: -2px;
    font-size: ${theme.fontSizes[4]}px;
  }
`

const Action = styled(LargeButton.withComponent(Link)).attrs({
  m: [1, null, 2],
  scale: true,
  py: 3,
  px: [3, 4],
  fontSize: 2
})``
const SlackAction = styled(Action)`
  background-image: ${theme.gradient('fuschia.5', 'pink.5')};
  @media screen and (max-width: 22em) {
    span {
      display: none;
    }
  }
`
const StartAction = styled(Action).attrs({ py: 3, px: 4 })`
  background-image: ${theme.gradient('orange.5', 'red.5')};
`

export default () => (
  <Root>
    <Wrapper>
      <Announcement>
        <Icon size={24} glyph="bank-circle" />
        <Text color="black" fontSize={1} ml={1}>
          <strong>Hack Club Bank 1.0</strong>
          <Text.span ml={1}>
            {'– '}
            redesigned & open to all
          </Text.span>
        </Text>
        <Announcement.Link to="/bank/">Learn more</Announcement.Link>
      </Announcement>
      <Text
        fontSize={[3, 4]}
        mx="auto"
        mt={3}
        mb={0}
        caps
        style={{ letterSpacing: '.05em' }}
      >
        By the students
        {', '}
        <br />
        for the students.
      </Text>
      <Heading.h1 fontSize={[7, 8]} mx={[0, null, -3, -5]} my={2}>
        High school coding clubs.
      </Heading.h1>
      <Stats>
        <Stats.Stat>{stats.school_count} schools</Stats.Stat>
        <Stats.Stat>{stats.state_count} states</Stats.Stat>
        <Stats.Stat>{stats.country_count} countries</Stats.Stat>
      </Stats>
      <Text fontSize={[3, 4]} mx="auto">
        Hack Club is a nonprofit network of computer science clubs where members
        learn to code through tinkering and building projects.
      </Text>
      <Flex justify="center" align="center" mx={[-1, -2]} mt={[3, 4]}>
        <SlackAction to="/slack_invite/" bg="pink.5">
          <span>Join </span>
          Slack
        </SlackAction>
        <StartAction to="/start/" fontSize={[3, null, 4]} chevronRight>
          Get Started
        </StartAction>
      </Flex>
    </Wrapper>
  </Root>
)
