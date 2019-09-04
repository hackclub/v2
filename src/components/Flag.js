import { theme } from '@hackclub/design-system'
import styled, { css, keyframes } from 'styled-components'
import { Link } from 'gatsby'

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
    transform: scale(.75) rotate(0deg);
  }
  to {
    transform: scale(.75) rotate(-5deg);
  }
`

const Flag = styled(Link)`
  background: url(/orpheus_flag.svg) no-repeat;
  background-position: top center;
  flex-shrink: 0;
  width: 112px;
  height: 48px;
  transition: ${theme.transition} transform;
  transform-origin: top left;
  ${theme.mediaQueries.md} {
    width: 144px;
    height: 72px;
  }
  &:hover,
  &:focus {
    animation: ${waveFlag} 0.5s linear infinite alternate;
  }
  ${theme.mediaQueries.reduceMotion} {
    animation: none;
  }
  ${props =>
    props.scrolled &&
    css`
      transform: scale(0.75);
      height: 44px !important;
      ${theme.mediaQueries.md} {
        height: 54px !important;
      }
      &:hover,
      &:focus {
        animation: ${waveFlagScaled} 0.5s linear infinite alternate;
      }
      ${theme.mediaQueries.reduceMotion} {
        animation: none;
      }
    `};
`
Flag.defaultProps = {
  to: '/',
  'aria-label': 'Homepage'
}

export default Flag
