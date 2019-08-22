import React from 'react'
import styled from 'styled-components'
import { Sheet, theme } from '@hackclub/design-system'

const BannerSheet = styled(Sheet)`
  position: absolute;
  top: 120px;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 100;
  background: ${theme.colors.white};
`

export default ({ children }) => {
  return (
    <BannerSheet maxWidth={30} width="auto">
      {children}
    </BannerSheet>
  )
}
