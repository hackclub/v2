import React from 'react'
import { theme } from '@hackclub/design-system'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Landing from 'components/bank/Landing'
import Run from 'components/bank/Run'
import Features from 'components/bank/Features'
import Testimonials from 'components/bank/Testimonials'
import Everything from 'components/bank/Everything'
import Timeline from 'components/bank/Timeline'
import Start from 'components/bank/Start'

const styles = `
  body {
    width: 100%;
    max-width: 100vw;
    background: ${theme.colors.dark};
  }
  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    text-shadow: none;
  }
`

const title = 'Hack Club Bank – The Bank For Student Hackers'
const desc =
  'Hack Club Bank provides a 501(c)(3) status-backed bank account optimized for high school hackathons that includes invoicing, debit cards, pre-written legal forms, seamless receipt collection, and automated tax filing to help organizers focus on running great events.'
const img = 'https://hackclub.com/cards/bank_one.png'

export default () => (
  <Layout>
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
    <Everything />
    <Timeline />
    <Run />
    <Start />
    <Footer dark />
  </Layout>
)
