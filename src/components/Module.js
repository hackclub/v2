import React from 'react'
import { Flex, Icon, Heading, Text } from '@hackclub/design-system'
import PropTypes from 'prop-types'

const Module = ({ icon, heading, name, body, lg, ...props }) => (
  <Flex flexDirection={['row', 'column']} {...props}>
    <Icon
      size={lg ? 64 : 48}
      mr={[3, null, 0]}
      mb={lg ? 2 : 1}
      name={icon}
      color={props.color || 'inherit'}
      style={{ flexShrink: 0 }}
    />
    <div>
      <Heading.h3 mb={1} f={lg ? [4, 5] : 3} children={heading || name} />
      <Text
        m={0}
        f={lg ? [3, 4] : 2}
        style={{ lineHeight: '1.375' }}
        children={body}
      />
    </div>
  </Flex>
)

Module.displayName = 'Module'

Module.propTypes = {
  icon: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  name: PropTypes.string, // TODO(lachlanjc): migrate everything to name
  body: PropTypes.string,
  lg: PropTypes.bool
}

export default Module
