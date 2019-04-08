import React from 'react'
import styled from 'styled-components'
import { Container, Flex, Icon, Text } from '@hackclub/design-system'

const Base = styled(Flex.withComponent(Container))`
  line-height: 1.25;
`

const NoComments = () => (
  <Base
    maxWidth={20}
    flexDirection="column"
    align="center"
    color="gray.5"
    py={4}
  >
    <Icon glyph="message-new" size={64} />
    <Text color="gray.6" fontSize={[2, 3]} bold>
      No comments here yet—start the conversation below!
    </Text>
  </Base>
)

export default NoComments
