import React from 'react'
import Button from './Button'

const CTA = props => (
  <Button
    f={[2, 3, 4]}
    py={3}
    px={4}
    m={2}
    bg="primary"
    color="white"
    {...props}
  />
)

export default CTA
