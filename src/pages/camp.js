import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from 'components/Layout'
import Footer from 'components/Footer'

import { theme } from 'components/camp/style'
import PageNav from 'components/camp/PageNav'
import Landing from 'components/camp/Landing'
import Manifesto from 'components/camp/Manifesto'
import Activities from 'components/camp/Activities'
import About from 'components/camp/About'
import Logistics from 'components/camp/Logistics'

const title = 'Hack Camp – Summer 2019 High School Coding Camp'
const desc =
  'July 2019, Hack Club’s high school learn-to-code summer camp returns to San Francisco.'

const schema = {
  event: {
    '@context': 'http://schema.org/',
    '@type': 'Event',
    name: 'Hack Camp',
    startDate: '2019-07-01T14:00',
    endDate: '2019-07-05T21:00',
    description:
      'Get started with coding and electronics during Hack Camp, a summer camp for high schoolers in San Francisco.',
    isAccessibleForFree: false,
    url: 'https://camp.hackclub.com',
    image: 'https://hackclub.com/cards/camp.png',
    location: {
      '@type': 'Place',
      name: 'Hack Club HQ',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '576 Natoma St',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        postalCode: '94103'
      }
    },
    sponsor: {
      '@type': 'Organization',
      name: 'Hack Club',
      url: 'https://hackclub.com'
    }
  }
}

export default () => (
  <Layout
    bg="dark"
    title={title}
    desc={desc}
    img="/cards/camp.png"
    path="/camp/"
  >
    <Helmet>
      <script type="application/ld+json" children={JSON.stringify(schema)} />
    </Helmet>
    <PageNav />
    <style>{`
      body {
        width: 100%;
        max-width: 100vw;
        color: ${theme.colors.smoke};
      }
      ::selection {
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
        text-shadow: none;
      }
    `}</style>
    <Landing />
    <Manifesto />
    <Activities />
    <About />
    <Logistics />
    <Footer dark />
  </Layout>
)
