import React from 'react'
import styled from 'styled-components'
import { Sheet, Link } from '@hackclub/design-system'

const BannerSheet = styled(Sheet.withComponent(Link)).attrs({
  mt: 0,
  mx: 'auto',
  mb: 4,
  bg: 'white',
  color: 'black',
  align: 'center',
  py: 2,
  px: 2
})`
  display: inline-block;
`

export default ({ children, top, ...props }) => (
  <BannerSheet maxWidth={24} width="auto" {...props}>
    {children}
  </BannerSheet>
)
