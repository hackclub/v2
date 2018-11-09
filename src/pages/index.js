import React from 'react'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Header from 'components/home/Header'
import About from 'components/home/About'
import Action from 'components/home/Action'
import Description from 'components/home/Description'
import Footer from 'components/Footer'

export default () => (
  <>
    <Helmet>
      <meta
        name="google-site-verification"
        content="f7cxVyFnrTxN9Q-HnpP-ueNWuWF5VgIEKF0C3tSnsnc"
      />
    </Helmet>
    <Nav />
    <Header />
    <About />
    <Action />
    <Footer>
      <Description />
    </Footer>
  </>
)
