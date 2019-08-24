import React from 'react'
import styled from 'styled-components'
import { Sheet, Link, theme } from '@hackclub/design-system'

const BannerSheet = styled(Sheet)`
  position: absolute;
  top: 96px;
  left: 50vw;
  transform: translateX(-50%);
  z-index: 100;
  background: ${theme.colors.white};
  padding: 14px 20px;
`

const OnlyDesktop = styled.span`
  display: none;
  ${theme.mediaQueries.md} {
    display: initial;
  }
`

export default () => {
  return (
    <BannerSheet maxWidth={50} width="auto">
      <p
        style={{
          textAlign: 'center',
          margin: 0
        }}
      >
        <OnlyDesktop>
          Hack Club Bank and MLH are combining forces!
          <br />
        </OnlyDesktop>{' '}
        <Link
          color="primary"
          href="https://medium.com/hackclub/hack-club-bank-and-mlh-are-combining-forces-c65ecb52f226"
          target="_blank"
        >
          See our latest announcement&nbsp;&rarr;
        </Link>
      </p>
    </BannerSheet>
  )
}
