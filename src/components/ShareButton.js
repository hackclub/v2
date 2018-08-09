import React from 'react'
import { Box, Button } from '@hackclub/design-system'
import { lowerCase } from 'lodash'

export const SocialButton = Button.extend`
  display: inline-flex;
  align-items: center;
  div {
    background-image: url(/social/${props =>
        lowerCase(props.service)
          .split(' ')
          .join('')}-white.svg);
    background-repeat: no-repeat;
    background-size: 100%;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }
`

const ShareButton = ({ children, ...props }) => (
  <SocialButton
    target="_blank"
    aria-label={`Share on ${props.service}`}
    f={2}
    {...props}
  >
    <Box mr={2} />
    {children || props.service}
  </SocialButton>
)

export default ShareButton
