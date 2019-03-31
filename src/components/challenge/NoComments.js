import React from 'react'
import { Container, Flex, Icon, Text } from '@hackclub/design-system'

const Base = Flex.withComponent(Container)

const NoComments = () => (
  <Base
    maxWidth={20}
    flexDirection="column"
    align="center"
    color="gray.5"
    py={4}
  >
    <Icon glyph="message-new" size={64} />
    <Text color="gray.6" fontSize={[2, 3]} mt={2} bold>
      No comments here yet—want to start the conversation below?
    </Text>
  </Base>
)

export default NoComments
