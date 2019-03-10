import styled from 'styled-components'
import React from 'react'
import { Container, Section, theme } from '@hackclub/design-system'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import { Headline, Lead } from 'components/Content'
import Nav from 'components/Nav'
import Sheet from 'components/Sheet'
import RedeemTechDomainForm from 'components/RedeemTechDomainForm'

const Base = styled(Section).attrs({
  px: 3,
  align: 'center',
  color: 'white'
})`
  background-color: ${theme.colors.red[5]};
  background-image: linear-gradient(
    -32deg,
    ${theme.colors.orange[4]},
    ${theme.colors.red[5]},
    ${theme.colors.red[6]}
  );
  min-height: 100vh;
`

export default () => (
  <Layout>
    <Helmet title="Free .TECH Domain – Hack Club" />
    <Nav />
    <Base>
      <Container maxWidth={32} pt={[5, 6]}>
        <Headline mb={3}>Free .TECH Domain!</Headline>
        <Lead color="red.0" maxWidth={28} mb={2}>
          Every Hack Club member gets a free .TECH domain from our awesome
          partners.
        </Lead>
        <Lead color="red.0" maxWidth={28}>
          Submit your request below and the .TECH team will set you up—it
          generally takes about a day.
        </Lead>
      </Container>
      <Sheet maxWidth={28} align="left" my={4} mx="auto">
        <RedeemTechDomainForm />
      </Sheet>
    </Base>
  </Layout>
)
