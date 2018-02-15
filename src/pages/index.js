import React from 'react'
import { ThemeProvider } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Bubbles from 'components/home/Bubbles'
import Stripe from 'components/home/Stripe'
import About from 'components/About'
import Superpower from 'components/home/Superpower'
import Collage from 'components/home/Collage'
import Mosaic from 'components/home/Mosaic'
import Start from 'components/Start'
import Footer from 'components/Footer'

export default () => (
  <ThemeProvider>
    <Helmet>
      <meta
        name="google-site-verification"
        content="f7cxVyFnrTxN9Q-HnpP-ueNWuWF5VgIEKF0C3tSnsnc"
      />
    </Helmet>
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
