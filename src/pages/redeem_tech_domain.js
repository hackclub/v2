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
  align: 'center'
})``

export default () => (
  <Layout bg="snow">
    <Helmet title="Free .TECH Domain – Hack Club" />
    <Nav color="slate" />
    <Base>
      <Container color="black" maxWidth={32} pt={[5, 6]}>
        <Headline color="primary" mb={3}>
          Free .TECH Domain!
        </Headline>
        <Lead maxWidth={28} mb={2}>
          Every Hack Club member gets a free domain from the awesome folks at
          .TECH.
        </Lead>
        <Lead maxWidth={28}>
          Request a domain below & they’ll set you up. It generally takes about
          a day.
        </Lead>
      </Container>
      <Sheet maxWidth={24} align="left" my={4} mx="auto">
        <RedeemTechDomainForm />
      </Sheet>
    </Base>
  </Layout>
)
