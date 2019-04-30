import React from 'react'
import Helmet from 'react-helmet'
import Layout from 'components/Layout'
import Footer from 'components/Footer'

import { theme } from './style'
import PageNav from './PageNav'
import Landing from './Landing'
import Manifesto from './Manifesto'
import Activities from './Activities'
import Admissions from './Admissions'

const description =
  'Learn how to start a coding club at your high school through Hack Club. Get programming club ideas, curriculum, activities, and more.'
const title = 'Hack Camp – Summer 2019 High School Coding Camp'

export default () => (
  <Layout bg="dark">
    <Helmet
      title={title}
      meta={[
        { name: 'twitter:title', content: title },
        { name: 'description', content: description },
        { name: 'twitter:description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://hackclub.com/camp' }
      ]}
    />
    {/* <Nav color="slate" unfixed /> */}
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
    <Admissions />
    <Footer dark />
  </Layout>
)
