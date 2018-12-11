import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Box, Flex, Button, Icon, Text } from '@hackclub/design-system'
import Sheet from 'components/Sheet'
import IconButton from 'components/IconButton'
import Link from 'gatsby-link'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const Root = styled(Sheet.withComponent(Flex))`
  a svg {
    animation: ${spin} 8s linear infinite;
  }
`

const Santa = () => (
  <Root
    mb={4}
    mt={4}
    p={[4, 3]}
    align="center"
    flexDirection={['column', 'row']}
    wrap
    bg="red.0"
    color="primary"
  >
    <Flex
      justify={['center', 'flex-start']}
      align="center"
      flex="1 1 auto"
      mb={[3, 0]}
    >
      <Icon glyph="bag" size={48} />
      <Box align="left" ml={[2, 3]}>
        <Text fontSize={2}>This season we’re also running a</Text>
        <Text fontSize={3} bold>
          Hack&nbsp;Club Secret&nbsp;Santa
        </Text>
      </Box>
    </Flex>
    <IconButton
      glyph="freeze"
      is={Button.withComponent(Link)}
      to="/santa"
      children="Secret Santa"
      inverted
    />
  </Root>
)

export default Santa
