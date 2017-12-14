import React from 'react'
import {
  Provider,
  Banner,
  Heading,
  Lead,
  Container,
  Flex,
  Box,
  Text,
  Subhead,
  Absolute,
  Link as A
} from 'rebass'
import theme, { colors, mx } from '../theme'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import ApplicationForm from '../components/ApplicationForm'
import Footer from '../components/Footer'

const Header = Box.extend.attrs({
  is: 'header',
  align: 'center',
  justify: 'center',
  direction: 'column',
  bg: 'primary',
  color: 'white',
  p: 3
})`text-align: center;`

export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Apply – Hack Club</title>
      <meta
        name="description"
        content="Submit your application to Hack Club and start a coding club at your high school."
      />
    </Head>
    <Header>
      <Nav />
      <Heading is="h1" f={[5, 6]} mt={4}>
        Submit your application
      </Heading>
      <Subhead>
        We’re accepting applications for 2018
      </Subhead>
    </Header>
    <ApplicationForm
      params={{start_date: new Date().toISOString()}}
    />
    <Footer />
  </Provider>
)
