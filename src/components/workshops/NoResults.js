import styled from 'styled-components'
import React from 'react'
import { Flex, Text, theme } from '@hackclub/design-system'

const Rounded = styled(Flex)`
  border-radius: ${theme.radii[1]};
`

const BreakWord = styled(Text)``

export default ({ value }) => (
  <Rounded
    direction="column"
    justify="center"
    align="center"
    bg="gray.1"
    px={4}
    py={5}
  >
    <BreakWord fontSize={3} lineHeight="normal" color="black">
      No results found {value && `for "${value}"`}
    </BreakWord>
  </Rounded>
)
