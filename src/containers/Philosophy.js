import React from 'react'
import {
  Provider,
  Banner,
  Heading,
  Container,
  Flex,
  Box,
  Text,
  Subhead,
  Link as A
} from 'rebass'
import theme, { colors, cx, mx } from '../theme'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import CTA from '../components/CTA'
import Icon from '../components/Icon'
import Footer from '../components/Footer'

export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Philosophy – Hack Club</title>
    </Head>
    <Footer />
  </Provider>
)
