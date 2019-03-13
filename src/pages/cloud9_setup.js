import styled from 'styled-components'
import React from 'react'
import {
  Container,
  Icon,
  LargeButton as Button,
  Link as A,
  Section,
  Text,
  theme
} from '@hackclub/design-system'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import { Headline } from 'components/Content'

const Header = styled(Section)`
  background-color: ${theme.colors.primary};
  background-image: ${theme.gradient('indigo.4', 'blue.6', 'blue.7')};
`

A.link = A.withComponent(Link)

export default () => (
  <Layout>
    <Helmet title="Cloud9 – Hack Club" />
    <Nav />
    <Header align="center" color="white">
      <Container maxWidth={32} p={3} mt={[5, 6]}>
        <Icon glyph="history" size={64} />
        <Headline mb={0}>Cloud9 has been discontinued.</Headline>
      </Container>
      <Container maxWidth={36} px={3} mb={[4, 5]}>
        <Text fontSize={3}>
          In the past, some of our{' '}
          <A.link underline color="inherit" to="/workshops/">
            Workshops
          </A.link>{' '}
          used an online IDE called Cloud9. The service is no longer
          recommended. Instead, try a great alternative like repl.it!
        </Text>
        <Button
          bg="info"
          href="https://repl.it/?ref=hackclub"
          my={4}
          scale
          chevronRight
          inverted
        >
          repl.it
        </Button>
      </Container>
    </Header>
    <Footer />
  </Layout>
)
