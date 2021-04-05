import React from 'react'
import styled from 'styled-components'
import {
  Avatar,
  Badge,
  Box,
  Container,
  Link as A,
  Flex,
  Icon,
  Text,
  theme
} from '@hackclub/design-system'
import { Title, Lead } from 'components/Content'
import { Fade } from 'react-reveal'
import { timeSince } from 'helpers'
import Run from 'components/bank/Run'

const Base = styled(Box.section).attrs({
  bg: 'dark',
  color: 'gray.3',
  py: [5, 6, 7]
})``

const Percentage = styled(Flex).attrs({
  justify: 'center',
  bg: 'black',
  color: 'success',
  fontSize: [5, 84]
})`
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  border-radius: ${theme.pill};
  font-weight: bold;
  text-align: center;
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.125);
  &:after {
    content: '%';
    vertical-align: super;
    line-height: 4rem;
    font-size: 50%;
    font-weight: normal;
    margin-left: ${theme.space[1]}px;
    color: ${theme.colors.muted};
  }
  ${theme.mediaQueries.md} {
    width: 8rem;
    height: 8rem;
    line-height: 8.5rem;
    &:after {
      line-height: 8rem;
    }
  }
`

const List = styled(Container.withComponent('ol')).attrs({ pl: 0 })`
  list-style: none;
  ${theme.mediaQueries.md} {
    display: grid;
    grid-column-gap: ${theme.space[4]}px;
    grid-template-columns: repeat(2, 1fr);
  }
  li {
    line-height: 1.25;
    break-inside: avoid;
    display: flex;
    align-items: center;
    padding-bottom: ${theme.space[2]}px;
  }
`

List.Item = ({ icon = 'enter', start, ...props }) => (
  <Fade left>
    <li style={{ display: 'flex', alignItems: 'center' }}>
      {start || <Icon glyph={icon} color="muted" size={32} mr={2} />}
      <Text.span fontSize={3} {...props} />
    </li>
  </Fade>
)

export default () => (
  <Base>
    <Container align="center" mb={[4, 5]} px={3}>
      <Title>Everything you’ll&nbsp;need.</Title>
      <Text.span>(and a little more...)</Text.span>
    </Container>
    <Container px={3}>
      <List>
        <List.Item icon="briefcase">Legal entity with 501(c)(3) status</List.Item>
        <List.Item icon="checkmark">We do your taxes</List.Item>
        <List.Item icon="enter">Collect donations via card, check, or ACH</List.Item>
        <List.Item icon="member-add">Share access with your whole team</List.Item>
        <List.Item icon="bank-account">Bank account backed by SVB</List.Item>
        <List.Item icon="transactions">Instant invoice sending</List.Item>
        <List.Item icon="analytics">Real-time dashboard of finances</List.Item>
        <List.Item icon="download">Transaction data export</List.Item>
        <List.Item icon="docs">Record shared notes on transactions</List.Item>
        <List.Item icon="clock">24-hour response support</List.Item>
        <List.Item icon="enter">Reimburse work payments</List.Item>
        <List.Item icon="email">Send & void physical checks</List.Item>
        <List.Item icon="enter">Online direct deposit / ACH transfers</List.Item>
        <List.Item icon="enter">Generate attendee legal waivers</List.Item>
        <List.Item icon="bolt">Google Workspace & email addresses</List.Item>
        <List.Item icon="card">Virtual debit cards (with Apple Pay)</List.Item>
        <List.Item icon="card">Debit card transaction paper trail</List.Item>
        <List.Item icon="bolt">Self-service, no-contract signup</List.Item>
        <List.Item icon="explore">Transparency Mode (optional)</List.Item>
        <List.Item icon="link">Online, embeddable donation form</List.Item>
      </List>
    </Container>
    <Run />
    <Container px={3} mt={4}>
      <Flex justify="center" align="center" wrap>
        <Text fontSize={[4, 5]} mr={[2, 3]}>
          You pay just
        </Text>
        <Percentage>7</Percentage>
        <Text fontSize={[4, 5]} ml={[2, 3]} mr={2}>
          of revenue.
        </Text>
        <Text fontSize={[4, 5]} mt={[3, 0]}>
          No upfront costs.
        </Text>
      </Flex>
      <Lead maxWidth={28} color="slate" fontSize={2} align="center" mt={[4, 5]}>
        Hack Club Bank is a{' '}
        <A
          color="primary"
          href="https://en.wikipedia.org/wiki/Fiscal_sponsorship"
          hoverline
        >
          fiscal sponsor
        </A>{' '}
        for your&nbsp;project.
        <br />
        Industry standard varies between 7-14% of&nbsp;revenue.
      </Lead>
    </Container>
  </Base>
)
