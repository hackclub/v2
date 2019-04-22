import styled from 'styled-components'
import React from 'react'
import {
  Container,
  Icon,
  LargeButton as Button,
  Link as A,
  Section,
  theme
} from '@hackclub/design-system'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import { Headline, Lead } from 'components/Content'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

// These 2 colors are from the gradient used on the original Hack Camp website
const campTheme = ['rgb(255, 75, 85)', 'rgb(212, 78, 116)']

const Header = styled(Section)`
  background-color: ${campTheme[0]};
  background-image: ${theme.gradient(campTheme[0], campTheme[1])};
  min-height: 80vh;
`

Button.link = Button.withComponent(Link)

export default () => (
  <Layout>
    <Helmet title="Hack Camp – Hack Club" />
    <Nav />
    <Header align="center">
      <Container maxWidth={32} pt={[5, 6]} pb={4} px={3} color="white">
        <Icon glyph="clubs-fill" size={64} />
        <Headline fontSize={[6, 7, 8]} my={3}>
          Hack Camp is coming&nbsp;soon.
        </Headline>
        <Lead>Check back soon for details.</Lead>
      </Container>
    </Header>
    <Footer />
  </Layout>
)
