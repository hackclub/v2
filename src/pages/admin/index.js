import React from 'react'
import { Container, Flex, Button, Heading } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

const Action = Button.withComponent(Link).extend.attrs({ m: 2 })``

export default () => (
  <Container maxWidth={48} align="center" px={3} py={[4, 5]}>
    <Helmet title="Admin – Hack Club" />
    <Heading.h1 f={[5, 6]}>Grand admin station</Heading.h1>
    <Heading f={4} mt={2} mb={4}>
      What is your destination?
    </Heading>
    <Flex align="center" justify="center" wrap>
      <Action to="/admin/clubs">Clubs</Action>
      <Action bg="info" to="/admin/applications">
        Club Applications
      </Action>
      <Action bg="accent" to="/admin/events">
        Events
      </Action>
    </Flex>
  </Container>
)
