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
import donors from 'components/donate/donors.json'

const Header = Section.withComponent('header').extend`
  background: url('/pattern.svg');
  > div {
    display: grid;
    grid-gap: ${({ theme }) => theme.space[4]}px;
    ${({ theme }) => theme.mediaQueries.md} {
      grid-template-columns: 3fr 2fr;
    }
  }
`

const Row = Box.extend`
  text-align: left;
  ${({ theme }) => theme.mediaQueries.md} {
    display: grid;
    grid-gap: ${({ theme }) => theme.space[3]}px;
    grid-template-columns: ${({ reverse }) =>
      reverse ? '3fr 2fr' : '2fr 3fr'};
  }
`

const Financials = Box.extend`
  display: grid;
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
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
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
    margin-left: -12px;
    vertical-align: super;
  }
  p {
    color: ${({ theme }) => theme.colors.red[1]};
  }
`

const Shapes = Box.extend`
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    float: right;
    position: relative;
    z-index: -1;
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
    right: 12rem;
    top: 1rem;
    color: ${({ theme }) => theme.colors.pink[4]};
  }
`
const DonorsShapes = Shapes.extend`
  svg:first-child {
    right: 8rem;
    top: 2rem;
    color: ${({ theme }) => theme.colors.orange[4]};
  }
  svg:last-child {
    right: 4rem;
    top: 4rem;
    color: ${({ theme }) => theme.hexa('blue.4', 0.75)};
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

const DonorCard = ({ name, link = false }) => (
  <Flex p={3} m={2} justify="center" align="center" style={{ height: '100%' }}>
    <Text color="black" style={{ textDecoration: link ? 'underline' : 'none' }}>
      {name}
    </Text>
  </Flex>
)

const DonorListing = ({ name, url }) => (
  <Box w={[1 / 2, 1 / 3]}>
    {url ? (
      <A target="_blank" href={url}>
        <DonorCard name={name} link={true} />
      </A>
    ) : (
      <DonorCard name={name} />
    )}
  </Box>
)

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
    <Header px={0} pt={[3, 4]} pb={[4, 5]}>
      <Container {...contentContainer} align="left" py={[4]}>
        <Container maxWidth={36} mx={0}>
          <Heading.h1 color="primary" f={[3, 4]} caps>
            Donate to Hack Club
          </Heading.h1>
          <Heading.h2 my={3} {...headline}>
            We rely on people like you to bring coding to the world.
          </Heading.h2>
          <Text {...subhline}>
            Contribute today to empower the next generation. Help start a Hack
            Club at every high school.
          </Text>
          <Text mt={3} f={2} color="muted">
            Your contribution is tax-deductible.<br />
            Hack Club is a 501(c)(3) non-profit with the EIN 81-2908499.
          </Text>
        </Container>
        <Card
          bg="snow"
          p={[3, 4]}
          mt={[0, -3, -4, -5]}
          style={{ overflow: 'hidden' }}
        >
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
        <Heading.h2 {...headline}>Transparent, free, and open.</Heading.h2>
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
          <A href="https://github.com/hackclub/ledger" bold>
            all of our financials are public
          </A>.
        </Text>
      </Container>
      <Row my={5} {...content}>
        <Box>
          <Heading.h2 {...headline}>
            Every last contribution is for our clubs.
          </Heading.h2>
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
                Spending breakdown
              </Heading.h3>
              <Spent />
            </Box>
          </Financials>
        </Box>
      </Row>
      <Container {...content}>
        <Heading.h2 {...headline}>
          Contribute more than just dollars.
        </Heading.h2>
        <Text my={3} {...subtext}>
          We accept donations of time, technical or hard science fiction books,
          stocks/other securities, and cryptocurrency.
        </Text>
        <Text my={3} {...subtext}>
          Please get in touch at{' '}
          <A href="mailto:donate@hackclub.com">donate@hackclub.com</A> if you’re
          interested in making a contribution or have any questions.
        </Text>
      </Container>
      <Container {...content} align="center" mx="auto">
        <Heading.h2 {...headline} mt={5} mb={4}>
          A few of our amazing donors.
        </Heading.h2>
        <Flex m={-2} wrap>
          {Object.keys(donors).map(name => (
            <DonorListing key={name} name={name} url={donors[name]} />
          ))}
        </Flex>
        <Heading.h3 {...subhline} mt={4} mb={5}>
          and many more...
        </Heading.h3>
      </Container>
    </Container>
    <Footer />
  </Fragment>
)
