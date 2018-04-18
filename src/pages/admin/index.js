import React, { Fragment } from 'react'
import { Button, Heading, Text, Link as A } from '@hackclub/design-system'

const Link = Button.withComponent(A)

export default () => (
  <Fragment>
    <Heading>Grand admin station</Heading>
    <Text>What is your destination?</Text>
    <Link href="/admin/clubs">Clubs</Link>
    <Link href="/admin/applications">Club Applications</Link>
    <Link href="/admin/events">Events</Link>
  </Fragment>
)
