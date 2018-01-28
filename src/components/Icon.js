import React from 'react'
import { Box, cx } from '@hackclub/design-system'
import { replace } from 'lodash'

export const url = (name = 'square', size = 16, fill = '#ffffff') =>
  `//icon.now.sh/${name}/${size}/${replace(cx(fill), '#', '')}`

Box.img = Box.withComponent('img')

const Icon = ({ name, fill, size = 16, alt, ...props }) => (
  <Box.img
    src={url(name, size, replace(cx(fill), '#', ''))}
    alt={alt || `${name} icon`}
    style={{ width: size, height: size, display: 'inline-block' }}
    {...props}
  />
)

export default Icon
