import React from 'react'
import { Image, Link } from 'rebass'
import { replace } from 'lodash'
import { cx } from './theme'

const Icon = ({ name = 'square', fill = '#ffffff', size = 16, ...props }) => (
  <Image
    src={`//icon.now.sh/${name}/${size}/${replace(cx(fill), '#', '')}`}
    alt={`${name} icon`}
    style={{ width: size, height: size, display: 'inline-block' }}
    {...props}
  />
)

export default Icon
