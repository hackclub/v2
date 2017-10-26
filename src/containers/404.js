import React from 'react'
import { Provider, Heading, Container, Box, Text } from 'rebass'
import theme from '../theme'
import { Head, Link } from 'react-static'
import Nav from '../components/Nav'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default () => (
  <Provider theme={theme}>
    <Head><title>404 – Hack Club</title></Head>
    <Nav />
    <Container maxWidth={48 * 16} px={3} py={6} align="center">
      <Heading color="primary" f={[5, 6]}>404!</Heading>
      <Text f={4} mt={2} mb={3} color="muted">We couldn’t find that page.</Text>
      <CTA is={Link} to="/" bg="primary" color="white">Go Home</CTA>
    </Container>
    <Footer />
  </Provider>
)
