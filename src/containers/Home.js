import React from 'react'
import { Provider } from 'rebass'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import Bubbles from '../components/Bubbles'
import Stripe from '../components/Stripe'
import Features from '../components/Features'
import Superpower from '../components/Superpower'
import Collage from '../components/Collage'
import Mosaic from '../components/Mosaic'
import Start from '../components/Start'
import Footer from '../components/Footer'
import theme from '../theme'

export default () => (
  <Provider theme={theme}>
    <Head><title>Hack Club</title></Head>
    <Nav style={{ position: 'absolute', top: 0 }} cloud />
    <Bubbles />
    <Stripe />
    <Features />
    <Superpower />
    <Collage />
    <Mosaic />
    <Start />
    <Footer />
  </Provider>
)
