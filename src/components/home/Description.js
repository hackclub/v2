import React from 'react'
import { Container, Text, Link as A } from '@hackclub/design-system'
import { Link } from 'gatsby'

A.link = A.withComponent(Link)

export default () => (
  <Container maxWidth={46} p={3} pb={5} align="center">
    <Text color="slate" fontSize={[2, 3]}>
      Hack Club is a nonprofit network of high school CS clubs that teach
      beginners to code. We provide{' '}
      <A href="https://guide.hackclub.com" target="_blank">
        club activities
      </A>
      ,{' '}
      <A.link to="/workshops" target="_blank">
        programming club curriculum
      </A.link>
      ,{' '}
      <Link href="https://hackathons.hackclub.com" target="_blank">
        access to high school hackathons
      </Link>
      , &{' '}
      <A.link to="/hackers" target="_blank">
        a supportive hacker community.
      </A.link>
    </Text>
  </Container>
)
