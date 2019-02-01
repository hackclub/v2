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
  Icon,
  theme,
  mediaQueries
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Observer from '@researchgate/react-intersection-observer'

import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Module from 'components/Module'
import Sheet from 'components/Sheet'
import { Lead } from 'components/Content'
import BankStats from 'components/bank/BankStats'

const styles = `
  body {
    width: 100%;
    max-width: 100vw;
    background-color: ${theme.colors.dark};
    color: ${theme.colors.gray[3]};
    background-image: radial-gradient(circle, ${theme.colors.black}, ${
  theme.colors.black
} 1px,
      ${theme.colors.dark} 1px, ${theme.colors.dark});
    background-size: 2rem 2rem;
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

const Modules = styled(Container)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  h3,
  svg {
    color: ${theme.colors.white};
  }
  ${theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${theme.space[4]}px;
    > div {
      align-items: center;
    }
  }
`
Modules.defaultProps = {
  px: 3,
  mt: [4, null, 3],
  mb: 3,
  mx: 'auto',
  maxWidth: 72,
  align: ['left', null, 'center']
}

const Header = styled(Box).attrs({
  pt: [6, 7],
  pb: 6,
  bg: 'white'
})`
  background-image: radial-gradient(
    circle,
    ${theme.colors.muted},
    ${theme.colors.muted} 1px,
    ${theme.colors.white} 1px,
    ${theme.colors.white}
  );
  background-size: 2rem 2rem;
`
const Megaline = styled(Heading.h1).attrs({
  fontSize: [6, 7, 8],
  color: 'black',
  mx: 'auto'
})`
  max-width: 700px;
  text-align: center;
  line-height: 1 !important;
  letter-spacing: -2px;
  line-height: 1.125;
`

const HeaderCTA = styled(A).attrs({
  fontSize: [4, null, 5],
  bold: true
})`
  // base styles
  cursor: pointer;
  display: flex;
  align-items: center;
  letter-spacing: -0.025em;
  position: relative;
  text-decoration: none;
  white-space: nowrap;
  margin-right: ${theme.space[3]}px;

  // default gradient text
  color: ${theme.colors.orange[5]};
  @supports (-webkit-background-clip: text) {
    background: linear-gradient(
      to bottom right,
      ${theme.colors.orange[5]} 30%,
      ${theme.colors.red[5]}
    );
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  // second cta
  &:last-of-type {
    margin-left: ${theme.space[3]}px;
    margin-right: 0;
    color: ${theme.colors.cyan[6]};
    @supports (-webkit-background-clip: text) {
      background: linear-gradient(
        to bottom right,
        ${theme.colors.cyan[6]} 30%,
        ${theme.colors.blue[6]}
      );
      background-repeat: no-repeat;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &::after {
      background-color: ${theme.colors.cyan[6]};
      background: linear-gradient(
        to bottom right,
        ${theme.colors.cyan[6]} 30%,
        ${theme.colors.blue[6]}
      );
    }
  }

  // underline
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0px;
    left: 0;

    border-radius: 9999px;
    background-color: ${theme.colors.orange[5]};
    background: linear-gradient(
      to bottom right,
      ${theme.colors.orange[5]} 30%,
      ${theme.colors.red[5]}
    );

    transform-origin: bottom right;
    transition: transform 0.25s ease-out;

    ${mediaQueries.md} {
      bottom: 8px;
    }
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  svg {
    margin-right: ${theme.space[2]}px;
  }
`

const Demo = styled(Image)`
  display: none;

  ${mediaQueries.md} {
    display: block;
  }
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

const Join = styled(Sheet)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  align-items: flex-start;
  ${theme.mediaQueries.md} {
    grid-template-columns: 32rem auto;
  }
`

const title = 'Hack Club Bank – The Bank For Student Hackers'
const desc =
  'Get a bank account for your high school coding event or hackathon with the backing of a 501(c)(3) non-profit. Student organizers can invoice sponsors, issue physical debit cards, and get access to their event’s financials through a real-time dashboard.'
const img = 'https://hackclub.com/cards/bank.png'

export default class extends Component {
  state = {
    dark: false
  }

  handleChange = event => {
    this.setState({
      dark: event.isIntersecting
    })
  }

  render() {
    const { dark } = this.state

    return (
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
        <Nav dark={dark} color="muted" />
        <Header>
          <Image
            src={require('../../static/bank/logo.svg')}
            alt="Hack Club Bank logo"
            width={128}
            mx="auto"
            mb={3}
          />
          <Megaline>The bank created for student hackers.</Megaline>
          <Lead color="muted" px={3} maxWidth={48} my={[3, 4]}>
            Hack Club Bank is the best place for high school hackers to store
            money for hackathons. Student organizers can invoice sponsors, issue
            physical debit cards, and get access to their event’s financials
            through a live dashboard—all with the benefits of the backing of a
            501(c)(3) nonprofit.
          </Lead>
          <Flex justify="center">
            <HeaderCTA
              target="_blank"
              href="https://goo.gl/forms/1UzFR4zkljL7dHQ32"
            >
              <Icon glyph="bank-fill" size={32} /> Apply now
            </HeaderCTA>
            <HeaderCTA
              onClick={() =>
                document
                  .querySelectorAll('img')[1]
                  .scrollIntoView({ behavior: 'smooth' })
              }
            >
              <Icon glyph="down-fill" size={32} /> Learn more
            </HeaderCTA>
          </Flex>
        </Header>
        <Demo src="/bank-screenshot-desktop.png" />
        <BankStats color="white" style={{ marginTop: -48 }} />
        <Observer onChange={this.handleChange}>
          <Box>
            <Banner>
              <Headline>Finances, done right.</Headline>
              <Lead maxWidth={36}>
                No waiting days for an email reply about your balance.
                Everything is immediately available and easy to see.
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

            <Banner maxWidth={36}>
              <Headline>A powerful toolbox for organizing your event.</Headline>
              <Lead>
                We’ve got all the tools to start planning your event, from
                emails with custom domains to legal forms.
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
                Planning your event is enough work. Let us answer questions and
                do the background work.
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
            <Container maxWidth={48} py={[4, 5]} px={3}>
              <Join align="left" bg="black">
                <Container maxWidth={32} mx={0}>
                  <Heading.h2 {...subhline} color="white">
                    Ready to join Hack Club Bank?
                  </Heading.h2>
                  <Text color="smoke">
                    You can join immediately with an invitation from an existing
                    Bank user or a member of the Hack Club community. Otherwise,
                    tell us about your event and we’ll get back to you within
                    two weeks.
                  </Text>
                </Container>
                <CTA href="https://goo.gl/forms/1UzFR4zkljL7dHQ32">Apply</CTA>
              </Join>
              <Lead maxWidth={32} color="slate" fontSize={1} mt={3}>
                Hack Club does not directly provide banking services. Banking
                services provided by Silicon Valley Bank, an FDIC-certified
                institution.
              </Lead>
            </Container>
            <Container maxWidth={48} py={[4, 5]} px={3} color="snow">
              <Headline align={['left', 'center']}>
                More organizer resources
              </Headline>
              <Flex flexDirection={['column', 'row']} align="left" mt={4}>
                <Container maxWidth={24} mb={3}>
                  <Heading.h3 {...subhline}>Hackathons Directory</Heading.h3>
                  <Text color="smoke" fontSize={2} mt={2} mb={3}>
                    We maintain an up-to-date directory of high school
                    hackathons happening all around the world. Attend some and
                    add yours!
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
                  <Heading.h3 {...subhline}>
                    #organizers channel on Slack
                  </Heading.h3>
                  <Text color="smoke" fontSize={2} mt={2} mb={3}>
                    On our Slack, we have a worldwide community of hundreds of
                    event organizers. Get advice and connect with fellow
                    organizers.
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
            <Footer dark />
          </Box>
        </Observer>
      </Box>
    )
  }
}
