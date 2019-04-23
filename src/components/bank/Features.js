import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  Heading,
  Flex,
  Icon,
  Text,
  theme
} from '@hackclub/design-system'
import { Headline, Lead } from 'components/Content'

const Base = styled(Box.section).attrs({ bg: 'dark', color: 'gray.3' })``

const Modules = styled(Container)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${theme.space[5]}px ${theme.space[4]}px;
    > div:first-child {
      grid-column: span 3;
    }
  }
`
Modules.defaultProps = {
  px: 3,
  mt: [4, null, 3],
  mb: 3,
  mx: 'auto',
  maxWidth: 72
}

const Module = ({ icon, name, body, ...props }) => (
  <Flex align="start" {...props}>
    <Icon
      size={48}
      mr={3}
      glyph={icon}
      color="primary"
      style={{ flexShrink: 0 }}
    />
    <Box>
      <Heading.h3 color="snow" fontSize={3} mb={1} children={name} />
      <Text
        color="muted"
        fontSize={2}
        style={{ lineHeight: '1.375' }}
        children={body}
      />
    </Box>
  </Flex>
)

const ModuleDetails = styled(Box).attrs({
  bg: '#252429',
  color: 'smoke',
  mt: 2,
  ml: 3,
  py: 3,
  px: 2
})`
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.0625);
  border-radius: ${theme.radii[2]};
  ul {
    padding: 0;
    list-style: none;
  }
  li + li {
    margin-top: ${theme.space[2]}px;
  }
`

const ModuleDetailsDocument = styled(Flex.withComponent('li'))``

const Document = ({ name, cost }) => (
  <ModuleDetailsDocument align={cost ? 'start' : 'center'}>
    <Icon
      size={28}
      mr={1}
      glyph="payment"
      color="success"
      style={{ flexShrink: 0 }}
    />
    <Box>
      <Text fontSize={2} children={name} />
      {cost && (
        <Text
          fontSize={1}
          color="muted"
          style={{ lineHeight: '1.375' }}
          children={cost}
        />
      )}
    </Box>
  </ModuleDetailsDocument>
)

const Laptop = styled.div`
  width: 100%;
  height: 100%;
  background-size: auto 115%;
  background-image: url('/bank/mac.png');
  background-position: center top;
  background-repeat: no-repeat;
  ${theme.mediaQueries.md} {
    grid-row: span 2;
    grid-column: span 2;
  }
`

export default () => (
  <Base pt={[5, 6, 7]} pb={[4, 5, 6]} color="snow">
    <Modules px={3}>
      <Box>
        <Headline>A powerful toolkit for organizing.</Headline>
        <Lead fontSize={[3, 4]} color="muted" maxWidth={48} mx={0}>
          Everything you need to start receiving money in days.
          <br />
          Ongoing support so you can focus on your event, not the IRS.
        </Lead>
      </Box>
      <Box>
        <Module
          icon="bank-account"
          name="Bank account"
          body="Backed by Silicon Valley Bank with a custom, beautiful dashboard."
        />
        <ModuleDetails>
          <Document
            name="501(c)(3) nonprofit status"
            cost="Become part of Hack Club's legal entity, getting the benefits of our tax status."
          />
          <Document
            name="Tax filings (990, end-of-year)"
            cost="We handle all filings with the IRS, so you can focus on your event, not hiring CPAs."
          />
        </ModuleDetails>
      </Box>
      <Laptop />
      <Module
        icon="card"
        name="Debit cards"
        body="Issue physical debit cards to all your teammates—no reimbursements."
      />
      <Module
        icon="analytics"
        name="Balance + history"
        body="Check real-time account balance + transaction history online anytime."
      />
      <Module
        icon="payment"
        name="Built-in invoicing"
        body="Accept sponsor payments with low negotiated rates from Stripe."
      />
      <Module
        icon="docs"
        name="Pre-written forms"
        body="Download liability + photo forms custom written by expert lawyers."
      />
      <Module
        icon="settings"
        name="Manage your finances"
        body="Add notes to transactions, export data, issue reimbursements."
      />
      <Module
        icon="google"
        name="G Suite"
        body="Get free G Suite + email addresses (like joy@hackpenn.com) for everyone."
      />
      <Module
        icon="support"
        name="Support anytime"
        body="We’ll never leave you in the dark. Best-effort 12hr response time."
      />
    </Modules>
  </Base>
)
