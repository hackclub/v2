import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Container, Card, Icon, Box, Text } from '@hackclub/design-system'
import Sheet from 'components/Sheet'

const Root = styled(Sheet)`
  display: flex;
  align-items: center;
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const Hourglass = styled(Icon)`
  animation: ${spin} 4s linear infinite;
`

const Ended = () => (
  <Root maxWidth={36} bg="teal.1" p={[2, 3]} mb={4}>
    <Hourglass name="hourglass_empty" size={48} mr={[2, 3]} color="teal.8" />
    <Box color="teal.9">
      <Text f={3} bold>
        This challenge has ended.
      </Text>
      <Text f={2}>Check back next week for the new challenge!</Text>
    </Box>
  </Root>
)

export default Ended
