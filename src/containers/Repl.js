import React from 'react'
import {
  Provider,
  Banner,
  Heading,
  Lead,
  Container,
  Flex,
  Box,
  Text,
  Subhead,
  Absolute,
  ButtonOutline
} from 'rebass'
import theme, { colors, mx } from '../theme'
import { Head, Link } from 'react-static'
import Features from '../components/Features'
import Stat from '../components/Stat'

const css = `
  body { background-color: #000; }
  #root > div, #features *, #stats span {
    color: ${colors.green[6]} !important;
    font-family: ${theme.monospace} !important;
    text-shadow: 0 1px 3px ${colors.green[4]};
    letter-spacing: -.02em;
  }
  #features > div > div {
    background-color: #000;
    border: 1px solid ${colors.green[6]};
    border-radius: 0;
  }
  #features img { display: none !important; }
  #features * {
    font-size: ${theme.fontSizes[2]};
  }
  #stats > div {
    padding-left: .5rem;
    padding-right: .5rem;
  }
  #stats p { color: ${colors.green[8]}; }
  #stats span { font-weight: 400; }
`

const Header = Flex.extend.attrs({
  is: 'header',
  align: 'center',
  justify: 'center',
  direction: 'column',
  px: [3, 0],
  py: [5, 3]
})`
  background: #000 url('/map-repl.svg') no-repeat;
  background-size: cover;
  background-position: 33% top;
  border-bottom: 1px solid ${colors.green[9]};
  text-align: center;
  ${mx[0]} {
    background-position: center top;
    min-height: 75vh !important;
  }
`
const Section = Box.extend.attrs({ is: 'section', py: 4 })`
  border-bottom: 1px solid ${colors.green[9]};
  text-align: center;
`
const Footer = Box.extend.attrs({
  is: 'footer',
  py: 4,
  f: 2
})`text-align: center;`

const Tagline = Text.extend.attrs({
  f: 3,
  mb: 2
})`
  text-align: center;
  text-transform: uppercase;
`
const Headline = Heading.extend.attrs({
  is: 'h1',
  f: 6,
  mb: 2
})`line-height: 1.125;`
const Subheadline = Heading.extend.attrs({
  f: 5,
  mt: 4,
  px: 3
})``

const CTA = Box.extend.attrs({
  is: 'a',
  color: colors.green[6],
  px: [2, 3, 4],
  py: [2, 3],
  mx: 2,
  f: [3, 4]
})`
  border: 2px solid ${colors.green[6]};
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
`
const CTA2 = CTA.extend.attrs({ f: 3 })`opacity: 0.8;`

export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Repl.it – Hack Club</title>
    </Head>
    <style children={css} />
    <Header>
      <Absolute p={3} top left>
        <Text
          is={Link}
          to="/"
          caps
          bold
          f={3}
          color="inherit"
          style={{ textDecoration: 'none' }}
        >
          Hack Club
        </Text>
      </Absolute>
      <Tagline>You know the power of coding</Tagline>
      <Headline>Start a Hack Club.</Headline>
      <Lead mt={[3, 4]}>
        Hack Club is a global network of high school coding clubs.
      </Lead>
      <Flex align="center" mx={-2} mt={[4, 5]}>
        <CTA2 is={Link} to="/">
          Learn More
        </CTA2>
        <CTA href="/apply">Get started »</CTA>
      </Flex>
    </Header>
    <Section>
      <Subheadline>Everything you’ll need</Subheadline>
      <Features headline={false} mb={4} />
    </Section>
    <Section>
      <Subheadline>We’re creating a movement</Subheadline>
      <Text f={3} mt={1}>
        Hack Club is more than just you.
      </Text>
      <Flex justify="center" id="stats" my={4} wrap>
        <Flex>
          <Stat value={180} label="clubs" />
          <Stat value={13} label="countries" />
        </Flex>
        <Flex>
          <Stat value={25} label="states" />
          <Stat value="2K+" label="members" />
        </Flex>
      </Flex>
      <Box my={5}>
        <CTA href="/apply">Join the movement »</CTA>
      </Box>
    </Section>
    <Footer>&copy; Hack Club</Footer>
  </Provider>
)
