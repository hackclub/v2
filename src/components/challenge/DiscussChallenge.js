import React from 'react'
import { Container, Card, Icon, Box, Flex, Text } from '@hackclub/design-system'
import DiscussOnSlack from 'components/DiscussOnSlack'

const Sheet = Container.withComponent(Card).extend`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const DiscussChallenge = () => (
  <Sheet maxWidth={36} mt={[3, 4]} py={3} px={[3, 4]} bg="red.0">
    <Flex align="center" flex="1 1 auto" mb={[3, 0]}>
      <Icon name="forum" size={24} mr={[2, 3]} color="primary" />
      <Text color="primary" f={2}>
        Join the conversation in <Text.span bold>#challenges</Text.span>
      </Text>
    </Flex>
    <DiscussOnSlack f={2} />
  </Sheet>
)

export default DiscussChallenge
