import { Box, Flex, Card } from '@hackclub/design-system'
import { css, keyframes } from 'styled-components'

const zoom = keyframes`
  0% {
    box-shadow: ${({ theme }) => theme.boxShadows[1]};
    transform: scale(0);
  }

  85% {
    transform: scale(1.025);
  }

  100% {
    box-shadow: ${({ theme }) => theme.boxShadows[2]};
    transform: scale(1);
  }
`

const DropdownContainer = Box.extend`
  position: relative;
  &:hover > div {
    display: block;
    animation: 0.1875s ease-out ${zoom};
    opacity: 1;
  }
`

const DropdownMenu = Card.withComponent(Flex).extend`
  display: none;
  opacity: 0;
  flex-direction: column;
  align-items: stretch;
  padding: ${({ theme }) => theme.space[2]}px 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadows[2]};
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

const DropdownMenuOption = Box.extend`
  padding: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[3]}px;
  cursor: pointer;
  width: 100%;
  ${props =>
    props.active &&
    css`
      background-color: ${({ theme }) => theme.colors.smoke};
      font-weight: ${({ theme }) => theme.bold};
    `};
  &:hover {
    transition: ${({ theme }) => theme.transition} background-color;
    background-color: ${({ theme }) => theme.colors.blue[0]};
  }
`

export { DropdownContainer, DropdownMenu, DropdownMenuOption }
