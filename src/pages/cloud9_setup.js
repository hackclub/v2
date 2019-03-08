import styled from 'styled-components'
import React, { Fragment } from 'react'
import {
  Container,
  Heading,
  Icon,
  LargeButton as Button,
  Link as A,
  Section,
  Text,
  theme
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

const Header = styled(Section)`
  background-color: ${theme.colors.primary};
  background-image: ${theme.gradient('blue.6', 'blue.7')};
`

A.link = A.withComponent(Link)

export default () => (
  <Fragment>
    <Helmet title="Cloud9 – Hack Club" />
    <Nav />
    <Header align="center">
      <Container maxWidth={32} pt={[5, 6]} pb={4} px={3} color="white">
        <Icon glyph="history" size={64} />
        <Heading.h1 fontSize={[5, 6]}>
          Cloud9 has been discontinued.
        </Heading.h1>
      </Container>
    </Header>
    <Container maxWidth={36} py={[5, 6]} px={3} color="black" align="center">
      <Text fontSize={3}>
        In the past, some of our <A.link to="/workshops/">Workshops</A.link> used an online IDE called Cloud9. The service is no longer recommended. Instead, check out repl.it!
      </Text>
      <Button
        bg="info"
        href="https://repl.it/?ref=hackclub"
        my={4}
        scale
        chevronRight
      >
        repl.it
      </Button.link>
    </Container>
    <Footer />
  </Fragment>
)
