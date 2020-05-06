import React from 'react'
import { theme } from '@hackclub/design-system'
import Layout from 'components/Layout'
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
  'Hack Club Bank provides a 501(c)(3) status-backed bank account optimized for high school hackathons including invoicing, debit cards, check sending, pre-written legal forms, automated tax filing, and transparent finances. Get fiscal sponsorship designed to help you run great events.'

export default () => (
  <Layout title={title} desc={desc} img="/cards/bank_one.png" path="/bank/">
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
