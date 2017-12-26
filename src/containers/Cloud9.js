import React from 'react'
import { Provider, Box, Heading } from 'rebass'
import theme from '../theme'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import Cloud9Form from '../components/Cloud9Form'

const Header = Box.extend.attrs({
  is: 'header',
  align: 'center',
  justify: 'center',
  direction: 'column',
  bg: 'primary',
  color: 'white',
  px: 3,
  pb: 3
})`text-align: center;`

export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Cloud9 – Hack Club</title>
    </Head>
    <Header>
      <Nav />
      <Heading is="h1" f={[5, 6]} mt={4} mb={2}>
        Let’s get you coding on Cloud9.
      </Heading>
      <Heading f={[3, 4]} style={{ fontWeight: 'normal' }}>
        Enter your email below and you’ll receive an invitation.
      </Heading>
    </Header>
    <Cloud9Form />
  </Provider>
)
