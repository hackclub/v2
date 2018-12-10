import styled from 'styled-components'
import React, { Fragment } from 'react'
import {
  Container,
  Heading,
  Icon,
  LargeButton as Button,
  Link as A,
  Section,
  Text
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

// These 2 colors are from the gradient used on the original Hack Camp website
const campTheme = ['rgb(255, 75, 85)', 'rgb(212, 78, 116)']

const Header = styled(Section)`
  background-color: ${campTheme[0]};
  background-image: linear-gradient(
    45deg,
    ${campTheme[0]} 0%,
    ${campTheme[1]} 100%
  );
`

Button.link = Button.withComponent(Link)

export default () => (
  <Fragment>
    <Helmet title="Hack Camp – Hack Club" />
    <Nav />
    <Header align="center">
      <Container maxWidth={32} pt={[5, 6]} pb={4} px={3} color="white">
        <Icon glyph="history" size={64} />
        <Heading.h1 fontSize={[5, 6]} mb={2}>
          Hack Camp has been discontinued.
        </Heading.h1>
        <Heading fontSize={[3, 4]}>
          We’ve replaced camps in favor of clubs!
        </Heading>
      </Container>
    </Header>
    <Container maxWidth={36} py={[5, 6]} px={3} color="black" align="center">
      <Text fontSize={3}>
        Apply to our clubs program and we’ll help you launch and lead a coding
        club at your school. It’s like summer camp, except that it runs all year
        long!
      </Text>
      <Button.link
        bg={campTheme[0]}
        color="white"
        to="/"
        my={4}
        scale
        chevronRight
      >
        Learn More + Apply
      </Button.link>
      <Text color="slate">
        Looking for the{' '}
        <A
          color={campTheme[0]}
          href="https://hackclub-archive.github.io/camp"
          target="_blank"
          rel="noopener"
          children="old Hack Camp website"
        />
        ?
      </Text>
      <Text color="slate">
        Still interested in a camp? Try{' '}
        <A
          color={campTheme[0]}
          href="https://camp.masonhackclub.com/"
          target="_blank"
          rel="noopener"
          children="🚀 Mason Hack Camp"
        />
        .
      </Text>
    </Container>
    <Footer />
  </Fragment>
)
