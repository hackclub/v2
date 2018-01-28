import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { mx } from 'theme'

const Flag = styled(Link).attrs({ to: '/' })`
  background: url(/orpheus_flag.svg) no-repeat;
  background-position: top center;
  width: 8rem;
  height: 3rem;
  z-index: 0;
  ${mx[0]} {
    width: 10rem;
    height: 4rem;
  }
`

export default Flag
