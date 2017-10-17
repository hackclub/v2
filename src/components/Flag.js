import React from 'react'
import { Absolute } from 'rebass'
import { mx } from '../theme'

const Flag = Absolute.extend.attrs({ top: true, left: true, right: true })`
  background: url(/orpheus_flag.svg) center no-repeat;
  height: 5rem;
  z-index: 0;

  ${mx[0]} {
    background-origin: content-box;
    background-position: top left;
    padding-left: 1rem;
    height: 6rem;
  }
`

export default Flag
