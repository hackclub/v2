import React from 'react'
import { Box, Flex, Heading, Icon, Text } from '@hackclub/design-system'
import PropTypes from 'prop-types'

const ModuleIcon = Box.withComponent(Icon)

const Module = ({ icon, name, body, ...props }) => (
  <Flex flexDirection={['row', 'column']} {...props}>
    <ModuleIcon
      size={48}
      mr={[3, null, 0]}
      mb={1}
      glyph={icon}
      color={props.color || 'inherit'}
      style={{ flexShrink: 0 }}
    />
    <Box>
      <Heading.h3 mb={1} fontSize={3} children={name} />
      <Text fontSize={2} style={{ lineHeight: '1.375' }} children={body} />
    </Box>
  </Flex>
)

Module.displayName = 'Module'

Module.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string
}

export default Module
