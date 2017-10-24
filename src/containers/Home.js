import React from 'react'
import { Provider } from 'rebass'
import Flag from '../components/Flag'
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
    <Flag />
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
