import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Box } from 'rebass'
import { colors } from './theme'

const bulge = keyframes`
  50% {
    transform: scale(1.1);
  }
`
const blink = keyframes`
  50% {
    opacity: 1;
  }
`

const Background = styled(Box)`
  background-color: ${colors.smoke};
  width: 4rem;
  height: 2rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${bulge} 2s ease-in-out infinite;
`

const Dot = styled.span`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.75rem;
  background-color: ${colors.silver};
  opacity: 0.4;
  animation: ${blink} 1s ease-in infinite ${props => props.delay}s;
  margin-left: 0.125rem;
  margin-right: 0.125rem;
`

const Typing = props => (
  <Background {...props}>
    <Dot delay={1 / 3} />
    <Dot delay={2 / 3} />
    <Dot delay={3 / 3} />
  </Background>
)

export default Typing
