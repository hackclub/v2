import React from 'react'
import {
  Card,
  Flex,
  Box,
  Heading,
  Text,
  Avatar,
  Badge
} from '@hackclub/design-system'

const Base = Card.withComponent(Flex).extend`
  border-radius: ${props => props.theme.radii[2]};
  max-width: 36rem;
  img {
    flex-shrink: 0;
  }
`

const Bio = ({ bg, img, name, role, text, ...props }) => (
  <Base p={3} bg={`${bg}.0`} {...props}>
    <Avatar size="64px" src={img} mr={2} alt={name} />
    <Box>
      <Flex align="center" wrap style={{ lineHeight: '1.25' }}>
        <Heading.h3 f={3} m={0} mr={2} color="black" children={name} />
        <Badge px={2} f={1} bg={`${bg}.5`} children={role} />
      </Flex>
      <Text f={2} mt={[1, 0]} mb={0} color="black" children={text} />
    </Box>
  </Base>
)

export default Bio
