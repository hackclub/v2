import React from 'react'
import { Container, Flex, Box, Heading, Image } from 'rebass'
import { mx } from '../theme'
import { range, shuffle } from 'lodash'

const Base = Box.extend`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  div {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0;
    height: 4rem;
    width: 100%;
    max-width: 25%;
  }

  ${mx[1]} {
    div {
      max-width: 12.5%;
      height: 6rem;
    }
  }
`

export default () => (
  <Base>
    {shuffle(range(32)).map(i => (
      <div
        style={{ backgroundImage: `url(/mosaic/${i + 1}.jpg)` }}
        key={`img-${i}`}
      />
    ))}
  </Base>
)
