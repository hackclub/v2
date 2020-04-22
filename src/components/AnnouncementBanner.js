import React from 'react'
import styled from 'styled-components'
import { Sheet } from '@hackclub/design-system'

const BannerSheet = styled(Sheet).attrs({
  mt: 0,
  mx: 'auto',
  mb: 4,
  bg: 'white',
  color: 'black',
  align: 'center',
  p: [2, null, 3]
})`
  display: inline-block;
`

export default ({ children, top, ...props }) => (
  <BannerSheet maxWidth={24} width="auto" {...props}>
    {children}
  </BannerSheet>
)
