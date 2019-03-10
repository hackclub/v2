import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Box, Icon, Text } from '@hackclub/design-system'
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
const Indicator = styled(Icon)`
  animation: ${spin} 8s linear infinite;
`

const Ended = () => (
  <Root maxWidth={36} bg="cyan.1" color="cyan.9" p={3} mb={[3, 4]}>
    <Indicator glyph="freeze" size={48} mr={[2, 3]} />
    <Box>
      <Text fontSize={3} bold>
        This challenge has ended.
      </Text>
      <Text fontSize={2}>Check back soon for the next one!</Text>
    </Box>
  </Root>
)

export default Ended
