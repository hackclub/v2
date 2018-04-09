import React, { Fragment } from 'react'
import {
  Box,
  Button,
  Container,
  Card,
  Flex,
  Heading,
  Section,
  Text,
  cx
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Auth from 'components/workshops/Auth'
import Composer from 'components/workshops/Composer'
import { Submit } from 'components/Forms'

const Header = Section.withComponent('header').extend([])
const Sheet = Container.withComponent(Card).extend([])

export default () => (
  <Fragment>
    <Helmet title="Submit a Workshop – Hack Club" />
    <Nav color="slate" style={{ position: 'absolute', top: 0 }} />
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
    <Sheet maxWidth={48} p={[3, 4]} bg="white" boxShadowSize="md">
      <Composer />
    </Sheet>
    <Auth />
    <Box align="center" pt={4} pb={5}>
      <Submit.lg bg="info" value="Submit for Review" />
    </Box>
  </Fragment>
)
