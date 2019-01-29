import React from 'react'
import { Container, Text, Link as A } from '@hackclub/design-system'
import Link from 'gatsby-link'

A.link = A.withComponent(Link)

export default () => (
  <Container maxWidth={46} p={3} pb={5} align="center">
    <Text color="slate" fontSize={[2, 3]}>
      Hack Club is a nonprofit network of high school CS clubs that teach
      beginners to code. We provide{' '}
      <A.link to="/workshops" target="_blank">
        programming club curriculum
      </A.link>
      ,{' '}
      <A.link to="/challenge" target="_blank">
        club activities
      </A>
      ,{' '}
      <A href="https://hackathons.hackclub.com" target="_blank">
        access to high school hackathons
      </A>
      , &{' '}
      <A.link to="/hackers" target="_blank">
        a supportive hacker community.
      </A.link>
    </Text>
  </Container>
)
