import React, { Fragment } from 'react'
import { theme } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Landing from 'components/bank/Landing'
import Run from 'components/bank/Run'
import Features from 'components/bank/Features'
import Testimonials from 'components/bank/Testimonials'
import Everything from 'components/bank/Everything'
import Timeline from 'components/bank/Timeline'

const styles = `
  body {
    width: 100%;
    max-width: 100vw;
    background: ${theme.colors.dark};
    /*-webkit-transform-style: preserve-3d;
    -webkit-transform:translate3d(0,0,0);
    -webkit-backface-visibility: hidden;*/
  }
  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`

const title = 'Hack Club Bank – The Bank For Student Hackers'
const desc =
  'Hack Club Bank provides a 501(c)(3) status-backed bank account optimized for high school hackathons that includes invoicing, debit cards, pre-written legal forms, seamless receipt collection, and automated tax filing to help organizers focus on running great events.'
const img = 'https://hackclub.com/cards/bank.png'

export default () => (
  <Fragment>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: desc },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: img },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:image', content: img },
        { property: 'og:url', content: 'https://hackclub.com/bank' }
      ]}
    />
    <style children={styles} />
    <Nav dark />
    <Landing />
    <Features />
    <Testimonials />
    <Timeline />
    <Run />
    {/* <Start /> */}
    {/* <Events /> */}
    <Everything />
    <Footer dark />
  </Fragment>
)
