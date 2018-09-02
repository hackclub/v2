import React from 'react'
import { Container, Text, Link } from '@hackclub/design-system'

export default () => (
  <Container maxWidth={46} pt={3} pb={5} align="center">
    <Text color="slate" f={3}>
      Hack Club is a nonprofit network of high school programming clubs that
      teach beginners to code. We provide{' '}
      <Link href="https://guide.hackclub.com" target="_blank">
        club activities
      </Link>,{' '}
      <Link href="/workshops" target="_blank">
        programming club curriculum
      </Link>,{' '}
      <Link href="https://hackathons.hackclub.com" target="_blank">
        access to high school hackathons
      </Link>, and{' '}
      <Link href="/slack_invite" target="_blank">
        a supportive hacker community.
      </Link>
    </Text>
  </Container>
)
