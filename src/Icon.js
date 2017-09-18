import React from 'react'
import { Image, Link } from 'rebass'
import { replace } from 'lodash'
import { cx } from './theme'

export const url = (name = 'square', size = 16, fill = '#ffffff') =>
  `//icon.now.sh/${name}/${size}/${replace(cx(fill), '#', '')}`

const Icon = ({ name, fill, size = 16, ...props }) => (
  <Image
    src={url(name, size, replace(cx(fill), '#', ''))}
    alt={`${name} icon`}
    style={{ width: size, height: size, display: 'inline-block' }}
    {...props}
  />
)

export default Icon
