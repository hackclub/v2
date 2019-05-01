import React from 'react'
import Layout from 'components/Layout'
import Footer from 'components/Footer'

import { theme } from './style'
import PageNav from './PageNav'
import Landing from './Landing'
import Manifesto from './Manifesto'
import Activities from './Activities'
import Registration from './Registration'

console.log(`
  ██╗  ██╗ █████╗  ██████╗██╗  ██╗     ██████╗ █████╗ ███╗   ███╗██████╗
  ██║  ██║██╔══██╗██╔════╝██║ ██╔╝    ██╔════╝██╔══██╗████╗ ████║██╔══██╗
  ███████║███████║██║     █████╔╝     ██║     ███████║██╔████╔██║██████╔╝
  ██╔══██║██╔══██║██║     ██╔═██╗     ██║     ██╔══██║██║╚██╔╝██║██╔═══╝
  ██║  ██║██║  ██║╚██████╗██║  ██╗    ╚██████╗██║  ██║██║ ╚═╝ ██║██║
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝
`)

const title = 'Hack Camp – Summer 2019 High School Coding Camp'
const desc =
  'July 2019, Hack Club’s high school learn-to-code summer camp returns to San Francisco.'

export default () => (
  <Layout
    bg="dark"
    title={title}
    desc={desc}
    img="/cards/camp.png"
    path="/camp/"
  >
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
    <Registration />
    <Footer dark />
  </Layout>
)
