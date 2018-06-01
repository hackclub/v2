import React from 'react'
import { Flex, Text } from '@hackclub/design-system'

const Rounded = Flex.extend`
  border-radius: ${props => props.theme.radii[1]};
`

const BreakWord = Text.extend``

export default ({ value }) => (
  <Rounded
    direction="column"
    justify="center"
    align="center"
    bg="gray.1"
    px={4}
    py={5}
  >
    <BreakWord f={3} lineHeight="normal" color="black">
      No results found {value && `for "${value}"`}
    </BreakWord>
  </Rounded>
)
