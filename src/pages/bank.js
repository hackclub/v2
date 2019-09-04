import React from 'react'
import styled from 'styled-components'
import { Link, theme } from '@hackclub/design-system'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import AnnouncementBanner from 'components/AnnouncementBanner'
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

const OnlyDesktop = styled.span`
  display: none;
  ${theme.mediaQueries.md} {
    display: initial;
  }
`

const title = 'Hack Club Bank – The Bank For Student Hackers'
const desc =
  'Hack Club Bank provides a 501(c)(3) status-backed bank account optimized for high school hackathons that includes invoicing, debit cards, pre-written legal forms, seamless receipt collection, and automated tax filing to help organizers focus on running great events.'

export default () => (
  <Layout title={title} desc={desc} img="/cards/bank_one.png" path="/bank/">
    <style children={styles} />
    <Nav dark />
    <AnnouncementBanner>
      <OnlyDesktop>
        Hack Club Bank and MLH are combining forces!
        <br />
      </OnlyDesktop>{' '}
      <Link
        color="primary"
        href="https://medium.com/hackclub/hack-club-bank-and-mlh-are-combining-forces-c65ecb52f226"
        target="_blank"
      >
        See our latest announcement&nbsp;&rarr;
      </Link>
    </AnnouncementBanner>
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
