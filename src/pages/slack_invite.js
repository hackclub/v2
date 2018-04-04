import React from 'react'
import { Box, Heading, Container, Card, Button } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import SlackForm from 'components/SlackForm'

const Fill = Box.withComponent('main').extend`
  padding: 0 !important;
  background: url('/pattern.svg'), linear-gradient(-32deg, #3f46ad, #1c299d);
  height: 100vh;
  overflow: auto;
`

const SlackCard = Card.extend`
  max-width: 24rem;
  &,
  input[type='email'] {
    background-color: rgba(255, 255, 255, 0.66);
  }
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(4px);
  }
  label {
    color: #1c299d;
  }
  input[type='email']::placeholder,
  ~ a:last-child {
    color: #3f46ad;
  }
`

export default () => (
  <Fill color="white" align="center">
    <Helmet title="Join Our Slack – Hack Club" />
    <Nav color="white" />
    <Container px={3}>
      <Heading.h1 f={[5, 6]} mt={4} mb={2}>
        Join the Hack Club Slack
      </Heading.h1>
      <Heading.h2 f={[3, 4]} mb={4} regular>
        Talk to our community, get coding help, have fun.
      </Heading.h2>
    </Container>
    <SlackCard
      w={1}
      p={[3, 4]}
      boxShadowSize="md"
      align="left"
      my={4}
      mx="auto"
    >
      <SlackForm />
    </SlackCard>
    <Button href="https://slack.hackclub.com" inverted>
      Sign in to your account »
    </Button>
  </Fill>
)
