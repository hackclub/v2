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
import { Headline, Lead } from 'components/Content'
import { Fade } from 'react-reveal'
import { timeSince } from 'helpers'

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

const List = styled(Text.withComponent('ol')).attrs({ pl: 0 })`
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

const thisMonth = new Date().toISOString().substring(0, 7)

export default () => (
  <Base>
    <Container px={3}>
      <Container align="center" mb={[4, 5]}>
        <Headline>Everything you’ll need.</Headline>
      </Container>
      <List>
        {Object.entries({
          'Legal entity with 501(c)(3) status': 'briefcase',
          'Automated tax filings': 'enter',
          'Collect donations via card, check, or ACH': 'enter',
          'Share access with your whole team': 'member-add',
          'Bank account backed by Silicon Valley Bank': 'bank-account',
          'Negotiated nonprofit rates with Stripe': 'enter',
          'Instant invoice sending': 'transactions',
          'Real-time dashboard of finances': 'analytics',
          'Transaction data export': 'download',
          'Record shared notes on transactions': 'docs',
          '24-hour response support': 'clock',
          'Reimbursement process': 'enter'
        }).map(([item, icon = 'enter']) => (
          <List.Item icon={icon}>{item}</List.Item>
        ))}
        <List.Item
          start={
            <Avatar
              src={require('../../../static/hackers/michael.jpg')}
              size={32}
              alt="Michael’s avatar"
              mr={2}
            />
          }
        >
          Dedicated point of contact
        </List.Item>
        {Object.entries({
          'Physical check sending & voiding': '2019-09-18',
          'Online ACH transfers': '2019-09-18',
          'Generate attendee legal waivers': '2020-01-15',
          'Instant G Suite & email addresses': '2020-01-15',
          'Online embeddable donation form': '2020-03-10',
          'Virtual debit cards (with Apple Pay)': '2020-03-08',
          'Debit card transaction paper trail': '2020-03-10',
          'Transparency Mode (optional)': '2020-05-05',
          'Self-serve, no-contract signup': '2020-05-05'
        }).map(([item, date]) => (
          <List.Item
            key={item}
            icon={
              item.startsWith('Instant')
                ? 'bolt'
                : item.includes('card')
                  ? 'card'
                  : item.includes('Transparency')
                    ? 'explore'
                    : 'enter'
            }
          >
            {item}{' '}
            <Badge bg={date.startsWith(thisMonth) ? 'primary' : 'muted'} ml={1}>
              {timeSince(date)}
            </Badge>
          </List.Item>
        ))}
      </List>
    </Container>
    <Container px={3} mt={4}>
      <Flex justify="center" align="center" wrap>
        <Text fontSize={[4, 5]} mr={3}>
          You pay just
        </Text>
        <Percentage>7</Percentage>
        <Text fontSize={[4, 5]} ml={3} mr={2}>
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
        for your event.
        <br />
        Industry standard varies between 7-14% of revenue.
      </Lead>
    </Container>
  </Base>
)

