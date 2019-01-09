import React from 'react'
import styled from 'styled-components'
import {
  Flex,
  IconButton,
  Text,
  Button,
  theme,
  mediaQueries,
  hexa
} from '@hackclub/design-system'
import Link from 'gatsby-link'

const Base = styled(Flex)`
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: ${theme.boxShadows[0]};

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1;

    ${mediaQueries.sm} {
      background-image: linear-gradient(
        180deg,
        transparent 65%,
        ${hexa('red.3', 0.75)} 0
      );
    }
  }

  a > a {
    background-color: ${hexa('info', 0.2)} !important;
    color: ${theme.colors.info};
  }
`

export default ({ name }) => (
  <Base p={3} align="center" justify="space-between">
    <Link to="/workshops/drafts">
      <IconButton
        glyph="view-back"
        bg="smoke"
        color="black"
        circle
        p={1}
        style={{ opacity: 0.7 }}
      />
    </Link>
    <Text fontSize={[2, 3]} bold mx={3}>
      {name}
    </Text>
    <Button bg="info" scale>
      Publish
    </Button>
  </Base>
)
