import React from 'react'
import { Box } from 'rebass'
import theme, { cx } from '../theme'

const Button = Box.extend.attrs({
  is: 'a',
  f: 4,
  m: 0,
  pl: 3,
  pr: 3,
  pt: 2,
  pb: 2
})([], props => ({
  color: cx(props.color || 'white'),
  backgroundColor: cx(props.bg || 'primary'),
  fontFamily: 'inherit',
  fontWeight: 'bold',
  lineHeight: 16 / 14,
  display: 'inline-block',
  verticalAlign: 'middle',
  textAlign: 'center',
  textDecoration: 'none',
  borderRadius: '4px',
  border: 0,
  appearance: 'none',
  boxShadow: '0 2px 12px rgba(0, 0, 0, .2)',
  transition: '.2s box-shadow ease-out',
  '&:hover, &:focus': {
    outline: 0,
    boxShadow: `0 4px 12px 2px rgba(0, 0, 0, .3)`
  },
  '&:disabled': {
    opacity: 1 / 4
  }
}))

export default Button
