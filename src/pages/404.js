import React, { Fragment } from 'react'
import { Heading, Container, LargeButton, Text } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

export default () => (
  <Fragment>
    <Helmet title="404 – Hack Club" />
    <Nav color="primary" />
    <Container maxWidth={48} px={2} py={6} align="center">
      <Heading.h1 color="primary" f={[5, 6]}>
        404!
      </Heading.h1>
      <Text f={4} mt={2} mb={3} color="muted">
        We couldn’t find that page.
      </Text>
      <LargeButton href="/">Go Home 🏡</LargeButton>
    </Container>
    <Footer />
  </Fragment>
)
