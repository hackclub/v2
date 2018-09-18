import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Box, Text } from '@hackclub/design-system'
import Icon from '@hackclub/icons'
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
const Indicator = styled(Box.withComponent(Icon))`
  animation: ${spin} 8s linear infinite;
`

const Ended = () => (
  <Root maxWidth={36} bg="cyan.1" color="cyan.9" p={[2, 3]} mb={4}>
    <Indicator glyph="freeze" size={48} mr={[2, 3]} />
    <Box>
      <Text f={3} bold>
        This challenge has ended.
      </Text>
      <Text f={2}>Check back soon for the next one!</Text>
    </Box>
  </Root>
)

export default Ended
