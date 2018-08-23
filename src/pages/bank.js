import React from 'react'
import styled, { css, injectGlobal } from 'styled-components'
import {
  Box,
  Flex,
  Container,
  Text,
  Heading,
  LargeButton,
  Link as A,
  Image,
  theme,
  colors,
  Image
} from '@hackclub/design-system'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Module from 'components/Module'
import Sheet from 'components/Sheet'
import BankStats from 'components/bank/BankStats'

colors.dark = '#17171d'
const styles = `
  body {
    width: 100%;
    max-width: 100vw;
    background-color: ${colors.dark};
    color: ${colors.gray[3]};
    background-image: radial-gradient(circle, ${colors.black}, ${
  colors.black
} 1px,
      ${colors.dark} 1px, ${colors.dark});
    background-size: 2rem 2rem;
  }
`

const CTA = styled(LargeButton).attrs({ bg: 'teal.6', fontSize: 2 })`
  background: ${theme.gradient('teal.5', 'teal.7')};
`

const Modules = styled(Container)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: ${({ theme }) => theme.space[3]}px;
  h3,
  svg {
    color: ${({ theme }) => theme.colors.white};
  }
  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: ${({ theme }) => theme.space[4]}px;
    > div {
      align-items: center;
    }
  }
`
Modules.defaultProps = {
  py: 0,
  px: 3,
  my: 3,
  mx: 'auto',
  maxWidth: 64,
  align: ['left', 'center']
}

const Megaline = Heading.h1.extend.attrs({
  f: [6, 7],
  color: 'white'
})`
  line-height: 1.125;
`
const Headline = styled(Heading.h2).attrs({
  f: [5, 6],
  mb: 3,
  color: 'snow',
  bold: true
})`
  line-height: 1.125;
`
const subhline = { f: [3, 4], style: { lineHeight: '1.375' } }

const Lead = Container.withComponent(Text)
Lead.defaultProps = { f: 3, mx: 'auto' }

const Banner = styled(Container).attrs({
  maxWidth: 48,
  mt: 5,
  mb: [3, 4],
  mx: 'auto',
  px: 3,
  align: ['left', 'center']
})``

const Join = styled(Sheet)`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  align-items: flex-start;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 32rem auto;
  }
`

const Breakdown = styled(Box)`
  div {
    width: 100%;
    display: block;
    text-align: left !important;
  }
  span:before {
    content: '$';
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    margin-left: -12px;
    vertical-align: super;
  }
  p {
    color: ${({ theme }) => theme.colors.red[1]};
  }
`

const title = 'Hack Club Bank – The Bank For Student Hackers'
const desc =
  'Get a bank account for your high school coding event or hackathon with the backing of a 501(c)(3) non-profit. Student organizers can invoice sponsors, issue physical debit cards, and get access to their event’s financials through a real-time dashboard.'
const img = 'https://hackclub.com/bank-banner.png'

export default () => (
  <Box align="center">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: desc },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: img },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:image', content: img },
        { property: 'og:url', content: 'https://hackclub.com/bank' }
      ]}
    />
    <style children={styles} />
    <Nav color="smoke" bgColor={[40, 40, 40]} />
    <Box>
      <Megaline pt={[5, 6]}>The bank for student hackers.</Megaline>
      <Lead color="inherit" px={3} maxWidth={48} my={[3, 4]}>
        Hack Club Bank is the best place for high school hackers to store money
        for hackathons. Student organizers can invoice sponsors, issue physical
        debit cards, and get access to their event’s financials through a
        real-time dashboard all with the benefits of the backing of a 501(c)(3)
        nonprofit.
      </Lead>
    </Box>
    <Flex justify="center" mb={[3, 4]}>
      <CTA href="https://medium.com/hackclub/a-bank-for-student-hackers-e5d894ea5375">
        Read the announcement
      </CTA>
    </Flex>
    <Banner>
      <Headline>Finances, done right.</Headline>
      <Lead maxWidth={36}>
        No waiting days for an email reply about your balance. Everything is
        immediately available and easy to see.
      </Lead>
    </Banner>
    <Modules>
      <Module
        icon="private-outline"
        name="Bank account"
        body="Get a 501(c)(3) non-profit bank account (contributions will be tax-deductible)."
      />
      <Module
        icon="analytics"
        name="Balance + history"
        body="Check real-time account balance and transaction history on the site at any time."
      />
      <Module
        icon="settings"
        name="Manage your finances"
        body="Add notes to transactions, export data, issue reimbursements. Easy."
      />
    </Modules>
    <Container maxWidth={70} mt={[4, 3]}>
      <Image w={1} src="/bank-screenshot.png" />
    </Container>
    <BankStats />
    <Banner>
      <Headline>A powerful toolbox for organizing your event.</Headline>
      <Lead maxWidth={32}>
        We’ve got all the tools to start getting your event ready, from emails
        with custom domains to legal forms.
      </Lead>
    </Banner>
    <Modules>
      <Module
        icon="edit"
        name="Pre-written forms"
        body="Download free consent and photo release forms for your event. No lawyers needed."
      />
      <Module
        icon="payment"
        name="Debit cards"
        body="Issue physical debit cards to all your team members—no need for reimbursements."
      />
      <Module
        icon="google"
        name="G Suite"
        body="Get free G Suite + email addresses (like megan@hackchicago.io) for everyone."
      />
    </Modules>
    <Banner>
      <Headline>We’re here to help out.</Headline>
      <Lead maxWidth={36}>
        Planning your event is enough work. Let us answer questions and do the
        background work.
      </Lead>
    </Banner>
    <Modules>
      <Module
        icon="checkmark"
        name="Taxes + accounting"
        body="We’ll handle end-of-year taxes and accounting in the background."
      />
      <Module
        icon="support"
        name="Support anytime"
        body="Questions? We’ll never leave you in the dark. Best-effort 12hr response time."
      />
      <Module
        icon="message"
        name="Community"
        body="Talk to our community of experienced event organizers anytime."
      />
    </Modules>
    <Container maxWidth={48} py={[4, 5]} px={3}>
      <Join align="left" bg="black">
        <Container maxWidth={32} mx={0}>
          <Heading.h2 {...subhline} color="white">
            Ready to join Hack Club Bank?
          </Heading.h2>
          <Text color="smoke">
            You can join immediately with an invitation from an existing Bank
            user or a member of the Hack Club community. Otherwise, tell us
            about your event and we’ll get back to you within two weeks.
          </Text>
        </Container>
        <CTA href="https://goo.gl/forms/1UzFR4zkljL7dHQ32">Apply</CTA>
      </Join>
      <Lead maxWidth={32} color="slate" f={1} mt={3}>
        Hack Club does not directly provide banking services. Banking services
        provided by Silicon Valley Bank, an FDIC-certified institution.
      </Lead>
    </Container>
  </Box>
)
