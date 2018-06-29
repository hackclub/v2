import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import Header from 'components/home/Header'
import ChallengeBanner from 'components/home/ChallengeBanner'
import About from 'components/home/About'
import Action from 'components/home/Action'
import Description from 'components/home/Description'
import Footer from 'components/Footer'

export default () => (
  <Fragment>
    <Helmet>
      <meta
        name="google-site-verification"
        content="f7cxVyFnrTxN9Q-HnpP-ueNWuWF5VgIEKF0C3tSnsnc"
      />
    </Helmet>
    <Header />
    <About />
    <ChallengeBanner />
    <Action />
    <Footer>
      <Description />
    </Footer>
  </Fragment>
)
