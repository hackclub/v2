import React from 'react'
import styled from 'styled-components'
import {
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
    column-count: 2;
    column-gap: ${theme.space[4]}px;
  }
  li {
    line-height: 1.25;
    break-inside: avoid;
    display: flex;
    align-items: center;
    padding-bottom: ${theme.space[2]}px;
  }
`

List.Item = props => (
  <Fade left>
    <li>
      <Icon glyph="enter" color="muted" size={32} mr={2} />
      <Text.span fontSize={3} {...props} />
    </li>
  </Fade>
)

export default () => (
  <Base>
    <Container px={3}>
      <Container align="center" mb={[4, 5]}>
        <Headline>Everything you’ll need.</Headline>
      </Container>
      <List>
        {[
          'Physical debit cards',
          'G Suite with domain email addresses',
          'Automated tax filings',
          'Legal entity with 501(c)(3) status',
          'Bank account backed by Silicon Valley Bank',
          'Instant invoice sending',
          'Collect donations via card, check, or ACH',
          'Real-time dashboard of finances',
          'Share access with your whole team',
          'Pre-written legal forms for event attendees',
          'Record shared notes on transactions',
          'Transaction data export',
          'Dedicated point of contact',
          '12-hour response support',
          'Negotiated nonprofit rates with Stripe',
          'Reimbursement process'
        ].map(item => (
          <List.Item key={item} children={item} />
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
