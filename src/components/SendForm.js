import { Flex, IconButton } from '@hackclub/design-system'
import styled from 'styled-components'

export const SendForm = Flex.withComponent('form').extend`
  position: relative;
  z-index: 4;

  > div:first-child,
  > label:first-child {
    flex: 1 1 auto;
    margin-bottom: 0;
  }
`
SendForm.defaultProps = {
  align: 'flex-end',
  w: 1
}

export const SendButton = styled(IconButton)`
  box-shadow: ${({ theme }) => theme.boxShadows[0]} !important;
  transition: ${({ theme }) => theme.transition} box-shadow;
  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadows[1]} !important;
  }
`
SendButton.defaultProps = {
  type: 'submit',
  color: 'white',
  size: 20,
  ml: 3
}
