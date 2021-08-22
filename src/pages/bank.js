// IMPORTANT NOTE: this pages has moved to hackclub/v3. This page remains here as an archive.

import React from 'react'
import { theme } from '@hackclub/design-system'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Landing from 'components/bank/Landing'
import Features from 'components/bank/Features'
import Testimonials from 'components/bank/Testimonials'
import Everything from 'components/bank/Everything'
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
  <Layout title={title} desc={desc} img="https://cloud-jjiw4lhcn.vercel.app/2020-08-08_edbp3wzddj5rn9nvz5vuqjzm4dezyvr8.jpeg" path="/bank/">
    <style children={styles} />
    <Nav dark />
    <Landing />
    <Features />
    <Testimonials />
    <Everything />
    <Start />
    <Footer dark />
  </Layout>
)
