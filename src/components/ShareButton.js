import React from 'react'
import IconButton from 'components/IconButton'

const ShareButton = ({ service, children, ...props }) => (
  <IconButton
    target="_blank"
    aria-label={`Share on ${props.service}`}
    glyph={service.toLowerCase()}
    f={2}
    {...props}
    children={children || service}
  />
)

export default ShareButton
