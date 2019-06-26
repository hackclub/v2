import React from 'react'
import styled from 'styled-components'
import { Container, mediaQueries, theme } from '@hackclub/design-system'

const Root = styled(Container).attrs({ pt: [6, 7], px: 4 })`
  display: grid;
  grid-gap: ${theme.space[4]}px;
  grid-template-columns: 1fr;

  ${mediaQueries.md} {
    grid-gap: ${theme.space[5]}px;
    grid-template-columns: repeat(2, 1fr);

    a:nth-child(1) {
      grid-column: span 2;
    }
  }

  ${mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  /* remove default spacing on Sheets  */
  > a > div {
    margin-bottom: 0;
    background-image: url('/dark-pattern.svg');
    color: #fff;
    height: 200px;
  }
`

export default ({ children }) => <Root>{children}</Root>
