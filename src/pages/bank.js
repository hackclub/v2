import React, { Fragment } from 'react'
import {
  Box,
  Flex,
  Container,
  Text,
  Heading,
  Button,
  LargeButton,
  Link as A,
  Card,
  Image
} from '@hackclub/design-system'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Module from 'components/Module'

const Base = Box.extend`
  background-color: #111;
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.gray[3]};
  background-image: radial-gradient(circle, #444, #444 1px, #111 1px, #111);
  background-size: 2rem 2rem;
`

const CTA = Button.extend`
  text-transform: uppercase;
`
CTA.defaultProps = {
  bg: 'teal.6',
  color: 'white',
  py: 3,
  px: 4,
  f: 2
}

const Modules = Container.extend`
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

const Internal = A.withComponent(Link).extend.attrs({ color: 'inherit' })``

const Alt = Container.withComponent(Flex).extend.attrs({
  maxWidth: 64,
  px: 3,
  flexDirection: 'column'
})`text-align: left;`
const AltBox = Box.extend.attrs({ my: 4 })`
  max-width: 36rem;
`
const AltLeft = AltBox.extend``
const AltRight = AltBox.extend.attrs({ ml: 'auto' })``

const Megaline = Heading.h1.extend.attrs({
  f: [6, 7],
  color: 'white'
})`line-height: 1.125;`
const Headline = Heading.h2.extend.attrs({
  f: [5, 6],
  mb: 3,
  color: 'snow',
  bold: true
})`line-height: 1.125;`
const subhline = { f: [3, 4], style: { lineHeight: '1.375' } }

const Lead = Container.withComponent(Text)
Lead.defaultProps = { f: 3, mx: 'auto' }

const Banner = Container.extend``
Banner.defaultProps = {
  maxWidth: 48,
  mt: 5,
  mb: [3, 4],
  mx: 'auto',
  px: 3,
  align: ['left', 'center']
}

const Join = Card.withComponent(Container).extend`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  align-items: flex-start;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 32rem auto;
  }
`

const Breakdown = Box.extend`
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
  <Base align="center">
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
    <Nav color="smoke" bgColor="rgba(40, 40, 40, 0.96)" />
    <Box>
      <Megaline pt={[5, 6]}>The bank for student hackers.</Megaline>
      <Lead px={3} maxWidth={48} my={[3, 4]}>
        Hack Club Bank is the best place for high school hackers to store money
        for hackathons. Student organizers can invoice sponsors, issue physical
        debit cards, and get access to their event’s financials through a
        real-time dashboard all with the benefits of the backing of a 501(c)(3)
        nonprofit.
      </Lead>
    </Box>
    <Flex justify="center" mb={[3, 4]}>
      <CTA
        href="https://medium.com/hackclub/a-bank-for-student-hackers-e5d894ea5375"
        target="_blank"
        scale
        chevronRight
      >
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
        icon="account_balance"
        name="Bank account"
        body="Get a 501(c)(3) non-profit bank account (contributions will be tax-deductible)."
      />
      <Module
        icon="history"
        name="Balance + history"
        body="Check real-time account balance and transaction history any time."
      />
      <Module
        icon="receipt"
        name="Manage your finances"
        body="Add notes to transactions, export data, issue reimbursements. Easy."
      />
    </Modules>
    <Container maxWidth={70} my={[4, 3]}>
      <Image w={1} src="/bank-screenshot.png" />
    </Container>
    <Banner mt={0}>
      <Headline>A powerful toolbox for organizing your event.</Headline>
      <Lead maxWidth={32}>
        We’ve got all the tools to start getting your event ready, from domain
        email to legal forms.
      </Lead>
    </Banner>
    <Modules>
      <Module
        icon="description"
        name="Pre-written forms"
        body="Download free consent and photo release forms for your event. No lawyers needed."
      />
      <Module
        icon="credit_card"
        name="Debit cards"
        body="Issue physical debit cards to all your team members—no need for reimbursements."
      />
      <Module
        icon="cloud"
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
        icon="local_atm"
        name="Taxes + accounting"
        body="We’ll handle end-of-year taxes and accounting in the background."
      />
      <Module
        icon="live_help"
        name="Support anytime"
        body="Questions? We’ll never leave you in the dark. Best-effort 12hr response time."
      />
      <Module
        icon="forum"
        name="Community"
        body="Talk to our community of experienced event organizers anytime."
      />
    </Modules>
    <Container maxWidth={48} pt={4} pb={[5, 6]} px={3}>
      <Join align="left" bg="black" p={[3, 4]}>
        <Container maxWidth={32} mx={0}>
          <Heading.h2 {...subhline} color="white">
            Ready to join Hack Club Bank?
          </Heading.h2>
          <Text>
            You can join immediately with an invitation from an existing Bank
            user or a member of the Hack Club community. Otherwise, tell us
            about your event and we’ll get back to you within two weeks.
          </Text>
        </Container>
        <CTA
          href="https://goo.gl/forms/1UzFR4zkljL7dHQ32"
          target="_blank"
          scale
          chevronRight
        >
          Apply
        </CTA>
      </Join>
      <Lead maxWidth={32} color="slate" f={1} mt={3}>
        Hack Club does not directly provide banking services. Banking services
        provided by Silicon Valley Bank, an FDIC-certified institution.
      </Lead>
    </Container>
  </Base>
)
