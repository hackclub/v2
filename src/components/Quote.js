import React from 'react'
import styled from 'styled-components'
import { Box, Icon, Flex, Avatar, theme } from '@hackclub/design-system'

const Base = styled(Box)`
  ${theme.mediaQueries.md} {
    svg {
      width: 48px;
      height: 48px;
      margin-left: -${theme.space[1]}px;
    }
  }
  img + div {
    line-height: 1.25;
  }
`

export default ({ accent = 'primary', color, text, img, name, credential }) => (
  <Base>
    <Icon glyph="quote" color={theme.colors.primary} size={32} mt={2} />
    <Lead color={color} children={text} />
    <Flex align="center" mt={3}>
      <Avatar src="/hackers/connie.jpg" size={48} mr={3} />
      <Box color="muted" align="left" fontSize={3}>
        {name}
        {credential && <Text fontSize={2}>{credential}</Text>}
      </Box>
    </Flex>
  </Base>
)
