import React from 'react'
import styled from 'styled-components'
import { Container, Card, Icon, Box, Flex, Text } from '@hackclub/design-system'
import Sheet from 'components/Sheet'
import DiscussOnSlack from 'components/DiscussOnSlack'

const Root = styled(Sheet)`
  display: flex;
  align-items: center;
`

const DiscussChallenge = () => (
  <Root maxWidth={36} mt={[3, 4]} p={[2, 3]} bg="pink.0">
    <Flex align="center" flex="1 1 auto" mb={[3, 0]}>
      <Icon name="forum" size={48} mr={[2, 3]} color="pink.5" />
      <Box align="left" color="pink.6">
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
