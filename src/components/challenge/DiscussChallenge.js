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
  <Root maxWidth={36} mt={[3, 4]} p={[2, 3]} bg="red.0">
    <Flex align="center" flex="1 1 auto" mb={[3, 0]}>
      <Icon name="forum" size={32} mr={[2, 3]} color="primary" />
      <Box align="left" color="primary">
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
