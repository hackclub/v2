import { Box, Flex, Card, theme } from '@hackclub/design-system'
import styled, { css, keyframes } from 'styled-components'

const zoom = keyframes`
  0% {
    box-shadow: ${theme.boxShadows[1]};
    transform: scale(0);
  }
  85% {
    transform: scale(1.025);
  }
  100% {
    box-shadow: ${theme.boxShadows[2]};
    transform: scale(1);
  }
`

export const DropdownContainer = styled(Box)`
  position: relative;
  &:hover > div {
    display: block;
    animation: 0.1875s ${theme.transition} ${zoom};
    opacity: 1;
  }
`

export const DropdownMenu = styled(Card.withComponent(Flex))`
  display: none;
  opacity: 0;
  flex-direction: column;
  align-items: stretch;
  padding: ${theme.space[2]}px 0;
  background-color: ${theme.colors.white};
  box-shadow: ${theme.boxShadows[2]};
  width: ${props => props.w || props.width || '256px'};
  max-width: 95vw;
  z-index: 4;
  position: absolute;
  right: 0;
  transform-origin: right top;
  text-align: left;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

export const DropdownMenuOption = styled(Box)`
  padding: ${theme.space[2]}px ${theme.space[3]}px;
  cursor: pointer;
  width: 100%;
  ${props =>
    props.active &&
    css`
      background-color: ${theme.colors.smoke};
      font-weight: ${theme.bold};
    `};
  &:hover {
    transition: ${theme.transition} background-color;
    background-color: ${theme.colors.blue[0]};
  }
`
