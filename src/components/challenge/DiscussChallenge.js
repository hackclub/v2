import React from 'react'
import { Container, Card, Icon, Box, Text } from '@hackclub/design-system'
import DiscussOnSlack from 'components/DiscussOnSlack'

const Sheet = Container.withComponent(Card).extend`
  display: flex;
  align-items: center;
`

const DiscussChallenge = () => (
  <Sheet maxWidth={36} mt={[3, 4]} py={2} px={3} bg="red.0">
    <Icon name="forum" size={24} mr={[2, 3]} color="primary" />
    <Text color="primary" f={2}>
      Join the conversation in <Text.span bold>#challenges</Text.span>
    </Text>
    <DiscussOnSlack f={2} ml="auto" />
  </Sheet>
)

export default DiscussChallenge
