import React from 'react'
import styled from 'styled-components'
import { Sheet, theme } from '@hackclub/design-system'

const BannerSheet = styled(Sheet)`
  padding: 14px 20px;
  position: absolute;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 100;
  background: ${theme.colors.white};
  text-align: center;
`

export default ({ children, top }) => {
  return (
    <BannerSheet maxWidth={30} width="auto" style={{ top: top ? top : '96px' }}>
      {children}
    </BannerSheet>
  )
}
