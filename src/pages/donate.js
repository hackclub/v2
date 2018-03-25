import React, { Fragment } from 'react'
import {
  Heading,
  Container,
  Flex,
  Box,
  Text,
  LargeButton,
  Icon,
  Section,
  Link as A
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Stat from 'components/Stat'
import Spent from 'components/donate/Spent'
import Footer from 'components/Footer'
import commaNumber from 'comma-number'

const Header = Section.withComponent('header').extend`
  padding-top: 0 !important;
  background-color: ${props => props.theme.colors.teal[6]};
  background: url('/pattern.svg'),
    linear-gradient(
      -32deg,
      ${props => props.theme.colors.green[7]} 0%,
      ${props => props.theme.colors.teal[6]} 50%,
      ${props => props.theme.colors.teal[7]} 100%
    );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);
`

const Grid = Box.extend`
  display: grid;
  grid-gap: ${props => props.theme.space[2]}px;
  width: 100%;

  > div {
    width: 100%;
    box-shadow: ${props => props.theme.boxShadows[3]};
    border-radius: ${props => props.theme.radius};
    max-width: 100%;
  }

  ${props => props.theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${props => props.theme.space[4]}px;
  }
`

const Stats = Box.extend`
  span {
    &:before {
      content: '$';
      font-size: ${props => props.theme.fontSizes[4]}px;
      margin-left: -12px;
      vertical-align: super;
    }
  }
  div {
    text-align: left;
    line-height: 1.25;
  }
`

A.link = A.withComponent(Link)

const title = 'Donate to Hack Club'
const description =
  'Contribute today to empower the next generation and help start a coding club at every high school.'

const stats = {
  monthly: 6742.71,
  student: 5,
  club: 100
}

export default () => (
  <Fragment>
    <Helmet
      title={title}
      meta={[
        { name: 'twitter:title', content: title },
        { name: 'description', content: description },
        { name: 'twitter:description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://hackclub.com/donate' }
      ]}
    />
    <Header>
      <Nav />
      <Container maxWidth={48} py={4}>
        <Heading.h1 f={[4, 5, 6]} mb={3}>
          Donate to Hack Club
        </Heading.h1>
        <Text f={[3, 4]}>
          Contribute today to empower the next generation and help start a
          coding club at every high school—we need your help.
        </Text>
      </Container>
    </Header>
    <Container w={1} px={[3, 4, null, 2]} mt={[4, 5]}>
      <Container maxWidth={48} mx={0}>
        <Text f={[3, 4]}>
          From day one, Hack Club has been a labor of love. We built this to
          create{' '}
          <strong>the organization we wished existed in the world</strong>. We
          wanted to build an organization we’d be proud to be a member of, to be
          a donor of, and to be an employee of.
        </Text>
        <Text f={[3, 4]} mt={3}>
          A core component of that is <strong>total transparency</strong>. It‘s
          the reason we open source all{' '}
          <A href="https://github.com/hackclub/hackclub">our content</A>
          {', '}
          <A href="https://github.com/hackclub/monolith">our code</A>
          {', '}
          <A href="https://github.com/hackclub/site">our website</A>, and our
          leaders and members are freely accessible on{' '}
          <A href="https://slack.hackclub.com">our Slack</A>. But we think if
          you’re making a contribution, you deserve to know exactly where it
          will go, so{' '}
          <strong>
            we make public{' '}
            <A href="https://github.com/hackclub/ledger">
              all of our financials
            </A>
          </strong>.
        </Text>
        <Heading.h2 f={[4, 5]} mt={4} mb={3}>
          Your contribution is for our clubs.
        </Heading.h2>
        <Text f={[3, 4]}>
          We spend our entire budget on paying{' '}
          <A.link to="/team">our team</A.link> and directly improving our clubs.
          There‘s no advertising spend, bonusses, or wasted contributions. To
          show you, here‘s a month of our financials.
        </Text>
      </Container>
      <Grid mt={4} mb={[4, 5]} color="white">
        <Box bg="accent" p={[3, 4]}>
          <Heading.h3 f={4} my={0} caps>
            Overall stats
          </Heading.h3>
          <Stats my={2}>
            <Stat
              f={6}
              w={1}
              value={commaNumber(stats.monthly)}
              label="monthly spend"
            />
            <Stat f={6} w={1 / 2} value={stats.student} label="per student" />
            <Stat f={6} w={1 / 2} value={stats.club} label="per club" />
          </Stats>
        </Box>
        <Box bg="primary" p={[3, 4]}>
          <Heading.h3 f={4} my={0} caps>
            Category breakdown
          </Heading.h3>
          <Spent />
        </Box>
      </Grid>
      <Container maxWidth={48} mx={0}>
        <Heading.h2 f={[4, 5]} mt={4} mb={3}>
          You’re making a real impact.
        </Heading.h2>
      </Container>
    </Container>
    <Footer />
  </Fragment>
)
