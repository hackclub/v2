import React from 'react'
import styled from 'styled-components'
import { Flex, Icon, Text } from '@hackclub/design-system'
import Link from 'gatsby-link'

import Sheet from 'components/Sheet'
import { Lead } from 'components/Content'
import IconButton from 'components/IconButton'

const ErrorContainer = styled(Flex).attrs({
  bg: 'snow',
  align: 'center',
  justify: 'center'
})`
  min-height: 100vh;
  div {
    height: fit-content;
    max-width: 42rem;
  }
  a svg {
    transform: rotate(180deg);
  }
`

export default () => (
  <ErrorContainer>
    <Sheet mx={4}>
      <Icon glyph="important" size={64} color="muted" />
      <Text fontSize={4} mb={1} bold>
        We had trouble loading this workshop.
      </Text>
      <Lead color="muted" maxWidth={28}>
        It may be private, or may have been deleted by an author or moderator.
      </Lead>
      <Link to="/workshops/drafts">
        <IconButton glyph="enter" mt={4}>
          Back to drafts
        </IconButton>
      </Link>
    </Sheet>
  </ErrorContainer>
)
