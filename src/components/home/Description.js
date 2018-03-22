import React from 'react'
import { Container, Text, Button } from '@hackclub/design-system'

export default () => (
  <Container maxWidth={42} mt={3} mb={4} align="center">
    <Text color="slate" f={3}>
      Hack Club is a nonprofit network of student-led high school programming
      clubs to teach beginners to code. We provide club activities, programming
      curriculum, and a friendly hacker community.
    </Text>
    {/*<Button href="https://finder.hackclub.com" inverted mt={[3, 4]}>
      Find a Club Near You »
    </Button>*/}
  </Container>
)
