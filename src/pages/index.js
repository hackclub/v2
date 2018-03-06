import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Bubbles from 'components/home/Bubbles'
import About from 'components/About'
import Mosaic from 'components/home/Mosaic'
import Footer from 'components/Footer'

export default () => (
  <Fragment>
    <Helmet>
      <meta
        name="google-site-verification"
        content="f7cxVyFnrTxN9Q-HnpP-ueNWuWF5VgIEKF0C3tSnsnc"
      />
    </Helmet>
    <Nav style={{ position: 'absolute', top: 0 }} color="primary" />
    <Bubbles />
    <About />
    <Mosaic />
    <Footer />
  </Fragment>
)
