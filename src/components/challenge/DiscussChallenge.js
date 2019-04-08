import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Icon, Text } from '@hackclub/design-system'
import Sheet from 'components/Sheet'
import DiscussOnSlack from 'components/DiscussOnSlack'

const Root = styled(Sheet.withComponent(Flex))``

const DiscussChallenge = () => (
  <Root
    maxWidth={36}
    p={[4, 3]}
    align="center"
    justify={['center', 'flex-start']}
    wrap
    bg="pink.0"
    color="pink.6"
    mt={[3, 4]}
  >
    <Flex
      justify={['center', 'flex-start']}
      align="center"
      flex="1 1 auto"
      mb={[3, 0]}
    >
      <Icon glyph="message-fill" size={48} />
      <Box align="left" color="pink.6" ml={[2, 3]}>
        <Text fontSize={2}>Join the conversation</Text>
        <Text fontSize={3} bold>
          #challenges
        </Text>
      </Box>
    </Flex>
    <DiscussOnSlack fontSize={2} />
  </Root>
)

export default DiscussChallenge
