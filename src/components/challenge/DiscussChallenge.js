import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Text } from '@hackclub/design-system'
import Icon from '@hackclub/icons'
import Sheet from 'components/Sheet'
import DiscussOnSlack from 'components/DiscussOnSlack'

const Root = styled(Sheet)`
  display: flex;
  align-items: center;
`

const DiscussChallenge = () => (
  <Root maxWidth={36} mt={[3, 4]} p={[2, 3]} bg="pink.0" color="pink.6">
    <Flex align="center" flex="1 1 auto" mb={[3, 0]}>
      <Icon glyph="message-fill" size={48} />
      <Box align="left" color="pink.6" ml={[2, 3]}>
        <Text f={2}>Join the conversation</Text>
        <Text f={3} bold>
          #challenges
        </Text>
      </Box>
    </Flex>
    <DiscussOnSlack f={2} />
  </Root>
)

export default DiscussChallenge
