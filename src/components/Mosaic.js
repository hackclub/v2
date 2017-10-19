import React from 'react'
import { Container, Flex, Box, Heading, Image } from 'rebass'
import { mx } from '../theme'
import { times } from 'lodash'

const Base = Box.extend.attrs({ my: 5 })`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  div {
    background-repeat: no-repeat;
    background-size: cover;
    height: 4rem;
  }

  ${mx[1]} {
    grid-template-columns: repeat(8, 1fr);
    div { height: 6rem; }
  }
`

export default () => (
  <Base>
    {times(32, i => (
      <div
        style={{ backgroundImage: `url(/mosaic/${i + 1}.jpg)` }}
        key={`img-${i}`}
      />
    ))}
  </Base>
)
