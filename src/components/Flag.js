import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-static'
import { mx } from '../theme'

const Flag = styled(Link).attrs({ to: '/' })`
  background: url(/orpheus_flag.svg) center no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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
