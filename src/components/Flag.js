import { theme } from '@hackclub/design-system'
import styled, { css, keyframes } from 'styled-components'

const waveFlag = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-5deg);
  }
`

const waveFlagScaled = keyframes`
  from {
    transform: scale(.875) rotate(0deg);
  }
  to {
    transform: scale(.875) rotate(-5deg);
  }
`

const Flag = styled.a`
  background: url(https://assets.hackclub.com/flag-orpheus-top.svg) no-repeat;
  background-position: top center;
  background-size: contain;
  flex-shrink: 0;
  width: 112px;
  height: 48px;
  transition: ${theme.transition} transform;
  transform-origin: top left;
  ${theme.mediaQueries.md} {
    width: 172px;
    height: 64px;
  }
  &:hover,
  &:focus {
    animation: ${waveFlag} 0.5s linear infinite alternate;
  }
  ${theme.mediaQueries.reduceMotion} {
    animation: none !important;
  }
  ${props =>
    props.scrolled &&
    css`
      transform: scale(0.875);
      height: 56px;
      &:hover,
      &:focus {
        animation: ${waveFlagScaled} 0.5s linear infinite alternate;
      }
    `};
`
Flag.defaultProps = {
  href: 'https://hackclub.com/',
  'aria-label': 'Homepage'
}

export default Flag
