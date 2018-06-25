import React from 'react'
import Helmet from 'react-helmet'
import Layout from 'components/Layout'
import Header from 'components/home/Header'
import ChallengeBanner from 'components/home/ChallengeBanner'
import About from 'components/home/About'
import Action from 'components/home/Action'
import Description from 'components/home/Description'
import Footer from 'components/Footer'

export default () => (
  <Layout>
    <Helmet>
      <meta
        name="google-site-verification"
        content="f7cxVyFnrTxN9Q-HnpP-ueNWuWF5VgIEKF0C3tSnsnc"
      />
    </Helmet>
    <Header />
    <ChallengeBanner />
    <About />
    <Action />
    <Footer>
      <Description />
    </Footer>
  </Layout>
)
