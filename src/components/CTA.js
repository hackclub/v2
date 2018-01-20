import React from 'react'
import Button from './Button'
import Link from 'gatsby-link'

const CTA = props => (
  <Button
    f={[2, 3, 4]}
    py={3}
    px={4}
    m={2}
    bg="primary"
    color="white"
    is={props.to ? Link : props.href ? 'a' : props.is}
    {...props}
  />
)

export default CTA
