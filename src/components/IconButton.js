import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Button } from '@hackclub/design-system'
import styled from 'styled-components'

const IconButton = ({ is = Button, name, size = 24, children, ...props }) => {
  const Component = styled(is)`
    display: flex;
    align-items: center;
  `
  return (
    <Component {...props}>
      <Icon color="inherit" name={name} size={size} mr={1} />
      <span children={children} />
    </Component>
  )
}

export default IconButton

IconButton.propTypes = {
  is: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  children: PropTypes.element.isRequired
}
