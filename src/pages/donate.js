import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link as A,
  Text,
  Avatar,
  theme
} from '@hackclub/design-system'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Sheet from 'components/Sheet'
import { Headline, Subhline, Lead } from 'components/Content'
import DonateForm from 'components/donate/DonateForm'
import Sponsors from 'components/donate/Sponsors'
import donors from 'components/donate/donors.json'

const Header = styled(Box.withComponent('header'))`
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
  maxWidth: 52,
  fontSize: 3,
  p: [4, 5],
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
    opacity: 0.5;
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
const headline = { fontSize: [5, 6], mb: 3, style: { lineHeight: '1.125' } }
const subhline = { fontSize: [3, 4], style: { lineHeight: '1.375' } }

const contentContainer = {
  maxWidth: 72,
  width: 1,
  p: 3,
  color: 'black',
  style: { position: 'relative' }
}
const content = { maxWidth: 48, mx: 0, color: 'black' }

A.link = A.withComponent(Link)

const title = 'Donate to Hack Club'
const description =
  'Contribute today to empower the next generation and help start a coding club at every high school.'

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
  <Layout>
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
    <Header pt={[4, 5, 6]}>
      <Container
        color="black"
        maxWidth={64}
        align="left"
        pt={[6, 7]}
        pb={6}
        px={3}
      >
        <Container maxWidth={48} mx={0}>
          <Heading.h1 color="primary" fontSize={[3, 4]} caps>
            Donate to Hack Club
          </Heading.h1>
          <Heading.h2 mt={2} mb={3} {...headline} fontSize={[6, 7]}>
            We rely on people like you to bring coding to the world.
          </Heading.h2>
          <Lead>
            Contribute today to empower the next generation. Help start a Hack
            Club at every high school.
          </Lead>
          <Text mt={3} fontSize={2} color="muted">
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
      <FirstQuote>
        <Text fontSize={4} mb={3}>
          When I took CS classes in high school, I always found myself
          disengaged and feeling like they were just another class. After
          getting involved in Hack Club, a career in computer science changed
          from a possibility to reality.
        </Text>
        <Text fontSize={[4, 5]} bold>
          Because of Hack Club, I started organizing hackathons with hundreds of
          participants, interning for companies including Intuit, and most
          importantly, fell in love with building things with code.
        </Text>
        <Flex align="center" mt={[3, 4]}>
          <Avatar src="/hackers/selynna.jpg" size={48} mr={3} />
          <Box align="left" fontSize={3}>
            <Text.span bold>Selynna Sun</Text.span>
            <Text fontSize={2} color="green.1">
              Sophomore & CS Major @ Cal Poly SLO
            </Text>
          </Box>
        </Flex>
      </FirstQuote>
      <Container maxWidth={48} py={[4, 5]}>
        <Subhline>Contribute beyond just dollars.</Subhline>
        <Lead my={3} mx={0}>
          We accept donations of time, technical or hard science fiction books,
          stocks/other securities, and cryptocurrency.
        </Lead>
        <Lead my={3} mx={0}>
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
            chevronRight
          >
            Donate with cryptocurrency
          </Button>
        </Box>
      </Container>
      <SecondQuote mt={[3, 4]} mb={[4, 5]}>
        <Text fontSize={[4, 5]} bold>
          Hack Club has inspired me to grow and become the person I am today.
          Being part of the community allows me to meet countless like-minded
          individuals who challenge me to become a better person, and a better
          hacker.
        </Text>
        <Flex align="center" mt={[3, 4]}>
          <Avatar src="/hackers/rashid.jpg" size={48} mr={3} />
          <Box align="left" fontSize={3}>
            <Text.span bold>Rashid Al-Abri</Text.span>
            <Text fontSize={2} color="blue.1">
              Club leader from Oman in Victoria, BC, Canada
            </Text>
          </Box>
        </Flex>
      </SecondQuote>
    </Container>
    <Flex justify="center" bg="snow" color="black">
      <Container width={1} py={[4, 5]} align={['left', 'center']}>
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
  </Layout>
)
