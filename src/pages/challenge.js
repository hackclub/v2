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
  background-color: ${theme.colors.pink[6]};
  background-image: ${theme.gradient('pink.5', 'pink.6', 'fuschia.6')};
`

A.link = A.withComponent(Link)

export default () => (
  <Layout>
    <Helmet title="Challenge – Hack Club" />
    <Nav />
    <Header align="center" color="white">
      <Container maxWidth={32} p={3} mt={[5, 6]}>
        <Icon glyph="history" size={64} />
        <Headline mb={0}>Challenge has been discontinued.</Headline>
      </Container>
      <Container maxWidth={36} px={3} mb={[4, 5]}>
        <Text fontSize={3}>
          In years past, we ran Challenges—prompts for coding projects with
          voting and prizes. They’re no longer running, but if you miss them,
          check out repl.it’s jams!
        </Text>
        <Button
          bg="pink.6"
          href="https://repl.it/jam"
          my={4}
          scale
          chevronRight
          inverted
        >
          repl.it jam
        </Button>
      </Container>
    </Header>
    <Footer />
  </Layout>
)
