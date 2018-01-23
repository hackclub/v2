import React from 'react'
import { ThemeProvider } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from '../components/Nav'
import Bubbles from '../components/Bubbles'
import Stripe from '../components/Stripe'
import About from '../components/About'
import Superpower from '../components/Superpower'
import Collage from '../components/Collage'
import Mosaic from '../components/Mosaic'
import Start from '../components/Start'
import Footer from '../components/Footer'
import theme from '../theme'
import data from '../data.json'

export default () => (
  <ThemeProvider>
    <Nav style={{ position: 'absolute', top: 0 }} mode="cloud" />
    <Bubbles />
    <Stripe />
    <About />
    <Superpower />
    <Collage />
    <Mosaic />
    <Start />
    <Footer />
  </ThemeProvider>
)
