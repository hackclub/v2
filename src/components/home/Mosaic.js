import React from 'react'
import { Flex, Box, mediaQueries } from '@hackclub/design-system'
import { range, shuffle } from 'lodash'

const Base = Flex.extend`
  div {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    margin: 0;
    height: 4rem;
    width: 100%;
    max-width: 25%;

    ${mediaQueries[1]} {
      max-width: 12.5%;
      height: 6rem;
    }
  }
`

export default () => (
  <Base wrap justify="center" align="center">
    {shuffle(range(32)).map(i => (
      <div
        style={{ backgroundImage: `url(/mosaic/${i + 1}.jpg)` }}
        key={`img-${i}`}
      />
    ))}
  </Base>
)
