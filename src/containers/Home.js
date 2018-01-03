import React from 'react'
import { ThemeProvider } from '@hackclub/design-system'
import { Head } from 'react-static'
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
import data from '../../data'

export default () => (
  <ThemeProvider>
    <Head>
      <title children={data.title} />
      <meta name="description" content={data.description} />
    </Head>
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
