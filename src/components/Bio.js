import React from 'react'
import styled from 'styled-components'
import {
  Card,
  Flex,
  Box,
  Heading,
  Text,
  Avatar,
  Badge
} from '@hackclub/design-system'
import Sheet from 'components/Sheet'

const Base = styled(Sheet)`
  display: flex;
  border-radius: ${({ theme }) => theme.radii[2]};
  max-width: 36rem;
  img {
    flex-shrink: 0;
  }
`

const Bio = ({ img, name, role, pronouns, text, ...props }) => (
  <Base mb={0} {...props}>
    <Box mr={[2, 3]}>
      <Avatar size="64px" src={img} alt={name} />
      <Text f={1} color="muted" align="center" mt={-1} children={pronouns} />
    </Box>
    <Box>
      <Flex align="center" wrap style={{ lineHeight: '1.25' }}>
        <Heading.h3 f={4} m={0} mr={2} color="black" children={name} />
        <Badge px={2} f={1} bg="primary" children={role} />
      </Flex>
      <Text f={2} mt={[1, 2]} mb={0} color="black" children={text} />
    </Box>
  </Base>
)

export default Bio
