import React from 'react'
import { Container, Card, Icon, Box, Text } from '@hackclub/design-system'

const Sheet = Container.withComponent(Card).extend`
  display: flex;
  align-items: center;
`

const Ended = () => (
  <Sheet maxWidth={32} bg="yellow.1" p={[2, 3]} mt={-3} mb={4}>
    <Icon name="mood_bad" size={48} mr={[2, 3]} color="warning" />
    <Box color="orange.6">
      <Text f={3} bold>
        This Challenge has ended.
      </Text>
      <Text f={2}>Check back next week for the new Challenge!</Text>
    </Box>
  </Sheet>
)

export default Ended
