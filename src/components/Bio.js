import React from 'react'
import styled from 'styled-components'
import {
  Flex,
  Box,
  Heading,
  Text,
  Avatar,
  Badge,
  theme
} from '@hackclub/design-system'
import Sheet from 'components/Sheet'

const Base = styled(Sheet)`
  display: flex;
  border-radius: ${theme.radii[2]};
  max-width: 36rem;
  img {
    flex-shrink: 0;
  }
`

const Bio = ({ img, name, teamRole, pronouns, text, ...props }) => (
  <Base mb={0} {...props}>
    <Box mr={[2, 3]}>
      <Avatar size="64px" src={img} alt={name} />
      <Text
        fontSize={1}
        color="muted"
        align="center"
        mt={-1}
        children={pronouns}
      />
    </Box>
    <Box>
      <Flex align="center" wrap style={{ lineHeight: '1.125' }}>
        <Heading.h3 fontSize={4} m={0} mr={2} color="black" children={name} />
        <Badge px={2} fontSize={1} bg="primary" children={teamRole} />
      </Flex>
      <Text fontSize={2} mt={1} mb={0} color="slate" children={text} />
    </Box>
  </Base>
)

export default Bio
