import React from 'react'
import {
  Button,
  Container,
  Heading,
  Text,
  Section,
  Link as A,
  ThemeProvider
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

// These 2 colors are from the gradient used on the original Hack Camp website
const campTheme = ['rgb(255, 75, 85)', 'rgb(212, 78, 116)']

const Header = Section.withComponent('header').extend`
  padding-top: 0 !important;
  background-color: ${campTheme[0]};
  background-image: linear-gradient(
    45deg,
    ${campTheme[0]} 0%,
    ${campTheme[1]} 100%
  );
`

Button.link = Button.withComponent(Link)

export default () => (
  <ThemeProvider>
    <Helmet title="Hack Camp – Hack Club" />
    <Header p={3}>
      <Nav />
      <Heading.h1 f={[5, 6]} mt={4}>
        Hack Camp has been discontinued.
      </Heading.h1>
      <Heading f={[3, 4]} mt={2}>
        We’ve replaced camps in favor of clubs!
      </Heading>
    </Header>
    <Container maxWidth={32} py={[3, 4]} align="center">
      <Text f={3}>
        Apply to our clubs program and we’ll help you launch and lead a coding
        club at your school. It’s like summer camp, except that it runs all year
        long!
      </Text>
      <Button.link bg={campTheme[0]} color="white" to="/start" my={4}>
        Learn More + Apply »
      </Button.link>
      <Text color="slate">
        Looking for the{' '}
        <A
          color={campTheme[0]}
          href="https://hackclub.github.io/camp/"
          children="old Hack Camp website"
        />?
      </Text>
    </Container>
    <Footer />
  </ThemeProvider>
)
