import styled from 'styled-components'
import React from 'react'
import { Container, Flex, Button, Heading } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

const Action = styled(Button.withComponent(Link)).attrs({ m: 2 })``

export default () => (
  <Container maxWidth={48} align="center" px={3} py={[4, 5]}>
    <Helmet title="🚉 Admin Station – Hack Club" />
    <Heading.h1 fontSize={[5, 6]}>Grand admin station</Heading.h1>
    <Heading fontSize={4} mt={2} mb={4}>
      What is your destination?
    </Heading>
    <Flex align="center" justify="center" wrap>
      <Action to="/admin/clubs">🚄 Clubs</Action>
      <Action bg="info" to="/admin/applications">
        🚅 Club Applications
      </Action>
      <Action bg="accent" to="/admin/events">
        🚝 Events
      </Action>
      <Action bg="warning" to="/admin/operations">
        ⚠️ Operations ⚠️
      </Action>
    </Flex>
  </Container>
)
