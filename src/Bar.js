import { Divider } from 'rebass'
import styled, { keyframes } from 'styled-components'
import { colors, gradient } from './theme'

const grow = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`

const Bar = Divider.extend.attrs({ my: 4, mx: 0 })`
  border: 0;
  height: 3px;
  background-image: ${gradient(90, colors.primary, colors.accent)};
  transform-origin: 0;
  animation-name: ${grow};
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`

export default Bar
