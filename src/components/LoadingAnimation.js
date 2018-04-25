import React, { Component } from 'react'
import { Box, cx } from '@hackclub/design-system'
import { keyframes } from 'styled-components'

const animation = keyframes`
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 58px;
    height: 58px;
    opacity: 0;
  }
`

const Base = Box.extend`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  div {
    position: absolute;
    border: 4px solid currentColor;
    opacity: 1;
    border-radius: ${props => props.theme.radii[4]};
    transform-origin: center;
    animation: ${animation} 0.975s ease-out infinite;
    &:nth-chld(2) {
      animation-delay: 0.5s;
    }
  }
`

const LoadingAnimation = props => (
  <Base aria-role="Presentation" aria-label="Loading" {...props}>
    <div />
    <div />
  </Base>
)

LoadingAnimation.defaultProps = {
  color: 'primary'
}

export default LoadingAnimation
