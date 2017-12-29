import React from 'react'
import { Provider, Box, Container, Heading } from 'rebass'
import theme from '../theme'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import RedeemTechDomainForm from '../components/RedeemTechDomainForm'

const Header = Box.extend.attrs({
  is: 'header',
  align: 'center',
  justify: 'center',
  direction: 'column',
  bg: 'primary',
  color: 'white',
  pb: 3
})`text-align: center;`

export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Get a Free .TECH Domain</title>
    </Head>
    <Header>
      <Nav />
      <Container maxWidth={36 * 16} p={0}>
        <Heading is="h1" f={[5, 6]} mt={4} mb={2}>
          Free .TECH Domain!
        </Heading>
        <Heading f={[3, 4]} style={{ fontWeight: 'normal' }}>
          Every Hack Club member gets a free .TECH domain from our awesome
          partners.
        </Heading>
      </Container>
    </Header>
    <RedeemTechDomainForm />
  </Provider>
)
