import React from 'react'
import { Container, Flex, Text, Icon } from '@hackclub/design-system'

const Base = Flex.withComponent(Container)

const NoComments = () => (
  <Base maxWidth={20} flexDirection="column" align="center" py={4}>
    <Icon name="forum" size={64} color="gray.5" mb={2} />
    <Text color="gray.6" f={[2, 3]} bold>
      No comments here yet—want to start the conversation below?
    </Text>
  </Base>
)

export default NoComments
