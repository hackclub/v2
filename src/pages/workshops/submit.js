import React, { Fragment } from 'react'
import { Container, Heading, Text, Section, cx } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Auth from 'components/Auth'
import SubmitForm from 'components/workshops/SubmitForm'
import Footer from 'components/Footer'

const Header = Section.withComponent('header').extend([])

export default () => (
  <Fragment>
    <Helmet title="Submit a Workshop – Hack Club" />
    <Nav invertFlag color="slate" style={{ position: 'absolute', top: 0 }} />
    <style children={`body{background:${cx('snow')};}`} />
    <Header py={4} mt={5} align="center">
      <Container maxWidth={32}>
        <Heading.h1 color="black" f={[5, 6]}>
          Submit a Workshop
        </Heading.h1>
        <Text f={4} color="muted" style={{ lineHeight: '1.25' }}>
          Thanks for your contribution! We’ll review it and email you when it’s
          live.
        </Text>
      </Container>
    </Header>
    <Auth />
    <SubmitForm />
    <Footer />
  </Fragment>
)
