import React, { Fragment } from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link as A,
  Section,
  Text,
  Avatar,
  theme
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Sheet from 'components/Sheet'
import Stat from 'components/Stat'
import { Triangle, Pentagon, Circle } from 'components/Shapes'
import { Headline, Subhline, Lead } from 'components/Content'
import DonateForm from 'components/donate/DonateForm'
import Spent from 'components/donate/Spent'
import Sponsors from 'components/donate/Sponsors'
import commaNumber from 'comma-number'
import donors from 'components/donate/donors.json'

const Header = styled(Section.withComponent('header'))`
  background: url('/pattern.svg');
  > div {
    display: grid;
    grid-gap: ${theme.space[4]}px;
    ${theme.mediaQueries.md} {
      grid-template-columns: 3fr 2fr;
    }
  }
`

const Row = styled(Box)`
  text-align: left;
  ${theme.mediaQueries.md} {
    display: grid;
    grid-gap: ${theme.space[3]}px;
    grid-template-columns: ${({ reverse }) =>
      reverse ? '3fr 2fr' : '2fr 3fr'};
  }
`

const DonateSheet = styled(Sheet)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.0625), 0 16px 32px rgba(0, 0, 0, 0.125) !important;
  > div > div:first-child {
    background-image: radial-gradient(
      ellipse farthest-corner at top left,
      ${theme.colors.orange[5]},
      ${theme.colors.red[5]}
    );
  }
`

const Quote = styled(Sheet).attrs({
  maxWidth: 48,
  f: 3,
  px: [3, 4, 5],
  py: 5,
  color: 'white'
})`
  position: relative;
  &:before {
    content: '“';
    line-height: 1;
    font-size: ${theme.fontSizes[7]}px;
    padding-left: ${theme.space[1]}px;
    position: absolute;
    left: 0;
    top: 0;
    color: ${theme.colors.snow};
    padding: ${theme.space[3]}px;
  }
`
const FirstQuote = styled(Quote)`
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    ${theme.colors.cyan[5]},
    ${theme.colors.teal[6]},
    ${theme.colors.green[7]}
  );
`
const SecondQuote = styled(Quote)`
  background-image: radial-gradient(
    ellipse farthest-corner at bottom left,
    ${theme.colors.blue[5]},
    ${theme.colors.indigo[5]},
    ${theme.colors.violet[5]}
  );
`

const Financials = styled(Sheet)`
  display: grid;
  ${theme.mediaQueries.md} {
    grid-template-columns: 2fr 3fr;
  }
`

const Stats = styled(Box)`
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    ${theme.colors.teal[6]},
    ${theme.colors.cyan[6]}
  );
  div {
    width: 100%;
    display: block;
    text-align: left !important;
  }
  span:before {
    content: '$';
    font-size: ${theme.fontSizes[4]}px;
    margin-left: -12px;
    vertical-align: super;
  }
  p {
    color: ${theme.colors.teal[1]};
  }
`

const Shapes = styled(Box)`
  display: none;
  ${theme.mediaQueries.md} {
    display: block;
    float: right;
    position: relative;
    z-index: -1;
    svg {
      position: absolute;
    }
  }
`
const WishShapes = styled(Shapes)`
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
const ContributionShapes = styled(Shapes)`
  svg {
    right: 12rem;
    top: 1rem;
    color: ${theme.colors.yellow[4]};
  }
`

const headline = { f: [5, 6], mb: 3, style: { lineHeight: '1.125' } }
const subhline = { f: [3, 4], style: { lineHeight: '1.375' } }
const subtext = { f: [3, 4], style: { lineHeight: '1.5' } }

const contentContainer = {
  maxWidth: 64,
  w: 1,
  p: 3,
  color: 'black',
  style: { position: 'relative' }
}
const content = { maxWidth: 48, mx: 0, color: 'black' }

A.link = A.withComponent(Link)

const title = 'Donate to Hack Club'
const description =
  'Contribute today to empower the next generation and help start a coding club at every high school.'

const stats = {
  monthly: 6742.71,
  student: 3,
  club: 60
}

const DonorGrid = styled(Box)`
  display: grid;
  grid-gap: ${theme.space[1]}px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  align-items: center;
  p,
  a {
    width: 100%;
  }
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[3]}px;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  }
`

const DonorCardBase = styled(Sheet)`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${theme.breakpoints.sm}em) {
    border-radius: 0;
    box-shadow: none;
  }
`
const DonorCard = ({ name, link = false }) => (
  <DonorCardBase bg="white" p={3} mb={0}>
    <Text color="black">{name}</Text>
  </DonorCardBase>
)

const DonorListing = ({ name, url }) => {
  if (url) {
    return (
      <A target="_blank" href={url} color="black" underline>
        <DonorCard name={name} link />
      </A>
    )
  } else {
    return <DonorCard name={name} />
  }
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
    <Header px={0} py={4}>
      <Container {...contentContainer} maxWidth={72} align="left" py={6}>
        <Container maxWidth={48} mx={0}>
          <Heading.h1 color="primary" f={[3, 4]} caps>
            Donate to Hack Club
          </Heading.h1>
          <Heading.h2 mt={2} mb={3} {...headline} f={[6, 7]}>
            We rely on people like you to bring coding to the world.
          </Heading.h2>
          <Lead>
            Contribute today to empower the next generation. Help start a Hack
            Club at every high school.
          </Lead>
          <Text mt={3} f={2} color="muted">
            Your contribution is tax-deductible.
            <br />
            Hack Club is a 501(c)(3) non-profit with the EIN 81-2908499.
          </Text>
        </Container>
        <DonateSheet bg="snow" mt={[0, -3, -4]}>
          <DonateForm />
        </DonateSheet>
      </Container>
    </Header>
    <Container {...contentContainer}>
      <FirstQuote mb={[5, 6]}>
        <Text f={4} mb={3}>
          When I took CS classes in high school, I always found myself
          disengaged and feeling like they were just another class. After
          getting involved in Hack Club, a career in computer science changed
          from a possibility to reality.
        </Text>
        <Text f={[4, 5]} bold>
          Because of Hack Club, I started organizing hackathons with hundreds of
          participants, interning for companies including Intuit, and most
          importantly, fell in love with building things with code.
        </Text>
        <Flex align="center" mt={[3, 4]}>
          <Avatar src="/hackers/selynna.jpg" size={48} mr={3} />
          <Box align="left" f={3}>
            <Text.span bold>Selynna Sun</Text.span>
            <Text fontSize={2} color="green.1">
              Sophomore & CS Major @ Cal Poly SLO
            </Text>
          </Box>
        </Flex>
      </FirstQuote>
      <WishShapes mt={3}>
        <Triangle size={128} rotate={64} />
        <Circle size={128} />
      </WishShapes>
      <Container {...content}>
        <Headline>Transparent, free, & open.</Headline>
        <Text my={3} {...subtext}>
          Hack Club is a new kind of non-profit with{' '}
          <strong>total transparency</strong>. We open source all of our{' '}
          <A href="https://github.com/hackclub/hackclub">content</A>
          {' and '}
          <A href="https://github.com/hackclub">code</A>. Many of our leaders
          and members are also available on{' '}
          <A href="https://slack.hackclub.com">our Slack</A>.
        </Text>
        <Text my={3} {...subtext}>
          You deserve to know exactly where your contribution will go—so{' '}
          <A href="https://github.com/hackclub/ledger">
            all of our financials are public
          </A>
          .
        </Text>
      </Container>
      <Row my={5} {...content}>
        <Box>
          <Subhline>Every last contribution is for our clubs.</Subhline>
          <ContributionShapes>
            <Pentagon size={128} rotate={16} />
          </ContributionShapes>
        </Box>
        <Box>
          <Text {...subtext}>
            We strive to build a maximally-efficient organization, spending 98%
            of funds given directly on our clubs.
          </Text>
          <Text mt={3} {...subtext}>
            When you give to Hack Club, your money goes where students need it
            most.
          </Text>
          <Financials p={0} mt={4}>
            <Stats bg="success" color="white" p={[3, 4]} pr={2}>
              <Heading.h3 f={4} mb={2} caps>
                Financials
              </Heading.h3>
              <Stat
                f={6}
                value={commaNumber(stats.monthly)}
                label="monthly spend"
                w={1}
              />
              <Stat f={6} mt={3} mb={2} value={stats.club} label="per club" />
              <Stat f={6} value={stats.student} label="per student" />
            </Stats>
            <Box p={[3, 4]}>
              <Heading.h3 f={4} my={0} caps>
                Spending breakdown
              </Heading.h3>
              <Spent />
            </Box>
          </Financials>
        </Box>
      </Row>
      <Container py={4}>
        <Subhline>Contribute beyond just dollars.</Subhline>
        <Lead my={3} maxWidth={48} mx={0}>
          We accept donations of time, technical or hard science fiction books,
          stocks/other securities, and cryptocurrency.
        </Lead>
        <Lead my={3} maxWidth={48} mx={0}>
          Please get in touch at{' '}
          <A href="mailto:donate@hackclub.com">donate@hackclub.com</A> if you’re
          interested in making a contribution with an unsupported token or have
          any questions.
        </Lead>
        <Box>
          <Button
            href="https://commerce.coinbase.com/checkout/ae7ad42d-0dcd-4e9d-8dc7-ba78648a58cd"
            target="_blank"
            bg="info"
          >
            Donate with popular cryptocurrencies »
          </Button>
        </Box>
      </Container>
      <SecondQuote mt={[3, 4]} mb={[4, 5]}>
        <Text f={[4, 5]} bold>
          Hack Club has inspired me to grow and become the person I am today.
          Being part of the community allows me to meet countless like-minded
          individuals who challenge me to become a better person, and a better
          hacker.
        </Text>
        <Flex align="center" mt={[3, 4]}>
          <Avatar src="/hackers/rashid.jpg" size={48} mr={3} />
          <Box align="left" f={3}>
            <Text.span bold>Rashid Al-Abri</Text.span>
            <Text f={2} color="blue.1">
              Club leader from Oman in Victoria, BC, Canada
            </Text>
          </Box>
        </Flex>
      </SecondQuote>
    </Container>
    <Flex justify="center" bg="snow" color="black">
      <Container w={1} py={[4, 5]} align={['left', 'center']}>
        <Headline px={3} mt={[3, 4]} mb={[4, 5]}>
          A few of our amazing donors.
        </Headline>
        <DonorGrid mt={4} mb={3}>
          {Object.keys(donors).map(name => (
            <DonorListing key={name} name={name} url={donors[name]} />
          ))}
        </DonorGrid>
        <Text {...subhline} px={3}>
          and many more…
        </Text>
      </Container>
    </Flex>
    <Container {...contentContainer}>
      <Row my={5} {...content}>
        <Subhline mb={4}>
          Some fabulous companies donate their products to us.
        </Subhline>
        <Sponsors />
      </Row>
    </Container>
    <Footer />
  </Fragment>
)
