import React, { Fragment } from 'react'
import { Container, Heading, Text, Section } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import RedeemTechDomainForm from 'components/RedeemTechDomainForm'

const Header = Section.withComponent('header').extend`
  background-color: ${({ theme }) => theme.colors.red[5]};
  background-image: linear-gradient(
    -32deg,
    ${({ theme }) => theme.colors.orange[4]},
    ${({ theme }) => theme.colors.red[5]},
    ${({ theme }) => theme.colors.red[6]}
  );
`

export default () => (
  <Fragment>
    <Helmet title="Free .TECH Domain – Hack Club" />
    <Nav />
    <Header align="center">
      <Container maxWidth={32} pt={4}>
        <Heading.h1 f={[5, 6]} mt={0} mb={2}>
          Free .TECH Domain!
        </Heading.h1>
        <Heading f={[3, 4]}>
          Every Hack Club member gets a free .TECH domain from our awesome
          partners.
        </Heading>
        <Text f={3} mt={2} style={{ lineHeight: '1.25' }}>
          Submit your request below and the .TECH team will set you up—it
          generally takes about a day.
        </Text>
      </Container>
    </Header>
    <RedeemTechDomainForm />
  </Fragment>
)
