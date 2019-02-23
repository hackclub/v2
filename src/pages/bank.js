import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import {
  Box,
  Flex,
  Container,
  Text,
  Heading,
  LargeButton as Button,
  Link as A,
  Image,
  theme
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Sheet from 'components/Sheet'
import { Lead } from 'components/Content'
// import Carousel from 'components/bank/Carousel'
import Landing from 'components/bank/LandingBottom'
import Run from 'components/bank/Run'
// import Events from 'components/bank/Events'
import Features from 'components/bank/Features'
import Testimonials from 'components/bank/Testimonials'
import Everything from 'components/bank/Everything'
import Timeline from 'components/bank/Timeline'
import BankStats from 'components/bank/Stats'

const styles = `
  body {
    width: 100%;
    max-width: 100vw;
    background: ${theme.colors.dark};
  }
  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`

const CTA = styled(Button).attrs({
  target: '_blank',
  scale: true,
  chevronRight: true,
  bg: 'teal.6'
})`
  background: ${theme.gradient('teal.6', 'teal.7', 'teal.8')};
`

const Megaline = styled(Heading.h1).attrs({
  fontSize: [6, 7, 8],
  color: 'white'
})`
  line-height: 1.125;
`
const Headline = styled(Heading.h2).attrs({
  fontSize: [5, 6],
  mb: 3,
  color: 'snow',
  bold: true
})`
  line-height: 1.125;
`
const subhline = { fontSize: [3, 4], style: { lineHeight: '1.375' } }

const Banner = styled(Container).attrs({
  maxWidth: 48,
  mt: [5, 6],
  mb: [3, 4],
  mx: 'auto',
  px: 3,
  align: ['left', 'center']
})``

const title = 'Hack Club Bank – The Bank For Student Hackers'
const desc =
  'Hack Club Bank provides a 501(c)(3) status-backed bank account optimized for high school hackathons that includes invoicing, debit cards, pre-written legal forms, seamless receipt collection, and automated tax filing to help organizers focus on running great events.'
const img = 'https://hackclub.com/cards/bank.png'

const Page = ({ handleThemeChange }) => (
  <Box color="gray.3">
    <Box pt={[6, 7]}>
      <Image
        src={require('../../static/bank/logo.svg')}
        alt="Hack Club Bank logo"
        width={128}
        mx="auto"
        mb={3}
      />
      <Megaline>The bank for student hackers.</Megaline>
      <Lead color="inherit" px={3} maxWidth={48} my={[3, 4]} children={desc} />
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
        icon="bank-account"
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
    <Container maxWidth={48} mt={[5, 6]} mb={4}>
      <Image
        width={1}
        src="/bank-screenshot.png"
        alt="Screenshot of Bank on an iPad Pro"
      />
    </Container>
    <BankStats />
    <Banner maxWidth={36}>
      <Headline>A powerful toolbox for organizing your event.</Headline>
      <Lead>
        We’ve got all the tools to start planning your event, from emails with
        custom domains to legal forms.
      </Lead>
    </Banner>
    <Modules>
      <Module
        icon="docs"
        name="Pre-written forms"
        body="Download free consent and photo release forms for your event. No lawyers needed."
      />
      <Module
        icon="card"
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
        icon="payment"
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
    <Container maxWidth={48} py={[4, 5]} px={3} color="snow">
      <Headline align={['left', 'center']}>More organizer resources</Headline>
      <Flex flexDirection={['column', 'row']} align="left" mt={4}>
        <Container maxWidth={24} mb={3}>
          <Heading.h3 {...subhline}>Hackathons Directory</Heading.h3>
          <Text color="smoke" fontSize={2} mt={2} mb={3}>
            We maintain an up-to-date directory of high school hackathons
            happening all around the world. Attend some and add yours!
          </Text>
          <A
            href="https://hackathons.hackclub.com"
            chevronRight
            hoverline
            color="primary"
          >
            See the list
          </A>
        </Container>
        <Container maxWidth={24} mb={3}>
          <Heading.h3 {...subhline}>#organizers channel on Slack</Heading.h3>
          <Text color="smoke" fontSize={2} mt={2} mb={3}>
            On our Slack, we have a worldwide community of hundreds of event
            organizers. Get advice and connect with fellow organizers.
          </Text>
          <A
            href="https://slack.hackclub.com"
            chevronRight
            hoverline
            color="primary"
          >
            Join our Slack
          </A>
        </Container>
      </Flex>
    </Container>
  </Box>
)

export default () => (
  <Fragment>
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
    <Nav dark />
    <Landing />
    <Features />
    <Testimonials />
    <Timeline />
    <Run />
    {/* <Start /> */}
    {/* <Events /> */}
    <Everything />
    <Footer dark />
  </Fragment>
)
