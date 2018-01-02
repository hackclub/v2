import React from 'react'
import {
  Flex,
  Box,
  Heading,
  Text,
  Avatar,
  Badge
} from '@hackclub/design-system'

const Base = Flex.extend`
  border-radius: ${props => props.theme.radii[1]}px;
  img {
    flex-shrink: 0;
  }
  /* will be fixed in next DS release */
  span {
    border-radius: 4px;
    line-height: 1.25;
  }
`

const Bio = ({ img, name, role, text, ...props }) => (
  <Base bg="blue.0" p={3} my={2} {...props}>
    <Avatar size="64px" src={img} mr={2} />
    <Box>
      <Flex align="center" wrap style={{ lineHeight: '1.25' }}>
        <Heading.h3 f={1} m={0} mr={2} regular={false} children={name} />
        <Badge px={2} f={1} bg="muted" children={role} />
      </Flex>
      <Text f={2} m={0} color="black" children={text} />
    </Box>
  </Base>
)

export default Bio
