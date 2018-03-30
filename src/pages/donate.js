import React, { Fragment } from 'react'
import {
  Heading,
  Container,
  Card,
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
import {
  Triangle,
  Hexagon,
  Pentagon,
  Square,
  Circle,
  Line
} from 'components/Shapes'
import DonateForm from 'components/donate/DonateForm'
import Spent from 'components/donate/Spent'
import Footer from 'components/Footer'
import commaNumber from 'comma-number'

const Header = Section.withComponent('header').extend`
  background: url('/pattern.svg');
  > div {
    display: grid;
    grid-gap: ${props => props.theme.space[4]}px;
    ${props => props.theme.mediaQueries.md} {
      grid-template-columns: 3fr 2fr;
    }
  }
  + div {
    position: relative;
  }
`

const Row = Box.extend`
  display: grid;
  grid-gap: ${props => props.theme.space[3]}px;
  text-align: left;
  ${props => props.theme.mediaQueries.md} {
    grid-template-columns: 2fr 3fr;
  }
`

const Financials = Box.extend`
  display: grid;
  border-radius: ${props => props.theme.radius};
  overflow: hidden;

  ${props => props.theme.mediaQueries.md} {
    grid-template-columns: 2fr 3fr;
  }
`

const Stats = Box.extend`
  div {
    width: 100%;
    display: block;
    text-align: left !important;
  }
  span:before {
    content: '$';
    font-size: ${props => props.theme.fontSizes[4]}px;
    margin-left: -12px;
    vertical-align: super;
  }
  p {
    color: ${props => props.theme.colors.red[1]};
  }
`

const Shapes = Box.extend`
  display: none;
  ${props => props.theme.mediaQueries.md} {
    display: block;
    float: right;
    position: relative;
    svg {
      position: absolute;
    }
  }
`

const WishShapes = Shapes.extend`
  svg {
    &:first-child {
      top: 0;
      right: 0;
      color: rgba(115, 45, 228, 0.75);
      z-index: 1;
    }
    &:last-child {
      top: 0;
      right: 4rem;
      color: rgba(45, 228, 207, 0.75);
    }
  }
`

const ContributionShapes = Shapes.extend`
  svg {
    right: 2rem;
    top: 6rem;
    color: rgba(45, 228, 115, 0.75);
  }
`

const headline = { f: [5, 6], color: 'black', style: { lineHeight: '1.125' } }
const subhline = { f: [3, 4], color: 'black', style: { lineHeight: '1.375' } }
const subtext = { f: [3, 4], color: 'black', style: { lineHeight: '1.5' } }

const contentContainer = {
  maxWidth: 64,
  w: 1,
  p: [3, 2],
  style: { position: 'relative' }
}
const content = { maxWidth: 48, mx: 0 }

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
    <Nav color="muted" />
    <Header px={0} pt={[3, 4]} pb={[4, 5, 6]}>
      <Container {...contentContainer} align="left" py={[4]}>
        <Container maxWidth={36} mx={0}>
          <Heading.h1 color="primary" f={[3, 4]} caps>
            Donate to Hack Club
          </Heading.h1>
          <Heading.h2 my={3} {...headline}>
            We rely on patrons like you to bring coding around the world.
          </Heading.h2>
          <Text {...subhline}>
            Contribute today to empower the next generation by helping start a
            coding club at every high school—we need your help.
          </Text>
          <Text mt={3} f={2} color="muted">
            Your contribution is tax-deductible.<br />
            Hack Club‘s nonprofit EIN is 81-2908499.
          </Text>
        </Container>
        <Card bg="snow" p={[3, 4]} style={{ overflow: 'hidden' }}>
          <DonateForm />
        </Card>
      </Container>
    </Header>
    <Container {...contentContainer}>
      <WishShapes mt={3}>
        <Triangle size={128} rotate={64} />
        <Circle size={128} />
      </WishShapes>
      <Container {...content}>
        <Heading.h2 {...headline}>
          We’re building the organization we wished existed in the world.
        </Heading.h2>
        <Text my={3} {...subtext}>
          From day one, Hack Club has been a labor of love. We wanted to build
          an organization we’d be proud to be a member of, to be a donor of, and
          to be an employee of.
        </Text>
        <Text {...subtext}>
          A core component of that is <strong>total transparency</strong>. It‘s
          the reason we open source all{' '}
          <A href="https://github.com/hackclub/hackclub">our content</A>
          {', '}
          <A href="https://github.com/hackclub/monolith">our code</A>
          {', '}
          <A href="https://github.com/hackclub/site">our website</A>, and our
          leaders and members are available on{' '}
          <A href="https://slack.hackclub.com">our Slack</A>. You deserve to
          know right where your contribution will go—so{' '}
          <A href="https://github.com/hackclub/ledger" bold>
            all of our financials are public
          </A>.
        </Text>
      </Container>
      <Row my={5} {...content}>
        <Box>
          <Heading.h2 {...headline}>
            Your contribution is for our clubs.
          </Heading.h2>
          <ContributionShapes>
            <Pentagon size={128} rotate={16} />
          </ContributionShapes>
        </Box>
        <Box>
          <Text {...subtext}>
            We spend our entire budget on paying{' '}
            <A.link to="/team">our team</A.link> and directly improving our
            clubs. There‘s no advertising waste, bonusses, or unused
            contributions.
          </Text>
          <Financials mt={4}>
            <Box bg="primary" color="white" p={[3, 4]} pr={2}>
              <Heading.h3 f={4} mb={2} caps>
                Financials
              </Heading.h3>
              <Stats>
                <Stat
                  f={6}
                  value={commaNumber(stats.monthly)}
                  label="monthly spend"
                  mb={3}
                  w={1}
                />
                <Stat f={6} mb={2} value={stats.club} label="per club" />
                <Stat f={6} value={stats.student} label="per student" />
              </Stats>
            </Box>
            <Box bg="snow" p={[3, 4]}>
              <Heading.h3 f={4} my={0} caps>
                Category breakdown
              </Heading.h3>
              <Spent />
            </Box>
          </Financials>
        </Box>
      </Row>
    </Container>
    <Footer />
  </Fragment>
)
