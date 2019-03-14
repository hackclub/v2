import React from 'react'
import styled from 'styled-components'
import { Container, Icon, Section, theme } from '@hackclub/design-system'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import { Headline, Lead } from 'components/Content'

const Header = styled(Section)`
  background-color: ${theme.colors.primary};
  background-image: ${theme.gradient('cyan.6', 'teal.6')};
`

export default () => (
  <Layout>
    <Helmet title=".TECH domains – Hack Club" />
    <Nav />
    <Header align="center" color="white" px={0}>
      <Container maxWidth={32} p={3} mt={[5, 6]}>
        <Icon glyph="history" size={64} />
        <Headline mb={0}>Our .TECH domain offer expired.</Headline>
      </Container>
      <Lead maxWidth={32} px={3} mb={[4, 5]} fontSize={3}>
        We used to have a partnership with .TECH domains to give Hack Clubbers
        free domains. Sadly, that offer is no longer available.
      </Lead>
    </Header>
    <Footer />
  </Layout>
)
