import React from 'react'
import { Button, Card, Heading, Text } from '@hackclub/design-system'

const Link = Card.withComponent(Button.link)

export default () => (
  <React.Fragment>
    <Heading>Grand admin station</Heading>
    <Text>What is your destination?</Text>
    <Link to="/admin/applications">Club Applications</Link>
    <Link to="/admin/events">Events</Link>
  </React.Fragment>
)
