import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Icon, Text } from '@hackclub/design-system'

const IconButton = ({ is = Button, glyph, size = 24, children, ...props }) => {
  const Component = styled(is)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `
  return (
    <Component {...props}>
      <Icon glyph={glyph} size={size} />
      {children && <Text.span ml={2} children={children} />}
    </Component>
  )
}

export default IconButton

IconButton.propTypes = {
  is: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  glyph: PropTypes.string.isRequired,
  size: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired
}
