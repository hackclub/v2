import { Flex, IconButton, theme } from '@hackclub/design-system'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const SendForm = styled(Flex.withComponent('form'))`
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
  width: 1
}

export const SendButton = styled(IconButton)`
  box-shadow: ${theme.boxShadows[0]} !important;
  transition: ${theme.transition} box-shadow;
  &:hover,
  &:focus {
    box-shadow: ${theme.boxShadows[1]} !important;
  }
`
SendButton.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  glyph: PropTypes.string,
  size: PropTypes.number
}
SendButton.defaultProps = {
  type: 'submit',
  color: 'white',
  glyph: 'send',
  size: 28,
  py: 1,
  ml: 3
}
