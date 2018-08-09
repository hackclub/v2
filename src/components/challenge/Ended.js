import React from 'react'
import { Container, Card, Icon, Box, Text } from '@hackclub/design-system'

const Sheet = Container.withComponent(Card).extend`
  display: flex;
  align-items: center;
`

const Ended = () => (
  <Sheet maxWidth={36} bg="yellow.1" p={[2, 3]} mt={-3} mb={3}>
    <Icon name="hourglass_empty" size={48} mr={[2, 3]} color="warning" />
    <Box color="orange.6">
      <Text f={3} bold>
        This challenge has ended.
      </Text>
      <Text f={2}>Check back next week for the new challenge!</Text>
    </Box>
  </Sheet>
)

export default Ended
