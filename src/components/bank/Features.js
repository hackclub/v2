import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  Heading,
  Flex,
  Icon,
  Text,
  Hide,
  theme
} from '@hackclub/design-system'
import { Headline, Subhline, Lead } from 'components/Content'
import { Fade } from 'react-reveal'
import Sheet from 'components/Sheet'

const Base = styled(Box.section).attrs({ bg: 'dark', color: 'gray.3' })``

const Modules = styled(Container)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${theme.space[5]}px ${theme.space[4]}px;
  }
  > div:first-child {
    grid-column: span 3;
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
  grid-row: span 2;
  grid-column: span 2;
  width: 100%;
  height: 100%;
  background-size: auto 115%;
  background-image: url('/bank/mac.png');
  background-position: center top;
  background-repeat: no-repeat;
`

export default () => (
  <Base pt={[5, 6, 7]} pb={[4, 5, 6]} color="snow">
    <Modules px={3}>
      <Box>
        <Headline>A powerful toolkit for organizing your event.</Headline>
        <Lead fontSize={[3, 4]} color="muted" maxWidth={48} mx={0}>
          Everything you need to start an amazing hackathon.
          <br />
          Fill out a simple form and we help handle the rest.
        </Lead>
      </Box>
      <Box>
        <Module
          icon="bank-account"
          name="Bank account"
          body="Get a 501(c)(3) non-profit bank account (income is tax-deductible)."
        />
        <ModuleDetails>
          <Document
            name="501(c)(3) status"
            cost="costs $3k, takes ~40hrs + months"
          />
          <Document
            name="Tax filing (990, 1099, end-of-year)"
            cost="accountant costs $150/hr, takes ~5hrs"
          />
          <Document name="White-glove help" align="center" />
        </ModuleDetails>
      </Box>
      <Laptop />
      <Module
        icon="analytics"
        name="Balance + history"
        body="Check real-time account balance + transaction history online anytime."
      />
      <Module
        icon="settings"
        name="Manage your finances"
        body="Add notes to transactions, export data, issue reimbursements. Easy."
      />
      <Module
        icon="docs"
        name="Pre-written forms"
        body="Download consent + photo forms for event attendees—skip the lawyers."
      />
      <Module
        icon="card"
        name="Debit cards"
        body="Issue physical debit cards to all your team members—not reimbursements."
      />
      <Module
        icon="google"
        name="G Suite"
        body="Get our free G Suite + email addresses (like joy@hackpenn.com) for everyone."
      />
      <Module
        icon="payment"
        name="Taxes + accounting"
        body="We’ll handle end-of-year taxes and accounting in the background."
      />
      <Module
        icon="support"
        name="Support anytime"
        body="Questions? We’ll never leave you in the dark. Best-effort 12hr response time."
      />
      {/*
      <Module
        icon="message"
        name="Community"
        body="Talk to our community of experienced event organizers anytime."
      />
      */}
    </Modules>
  </Base>
)
