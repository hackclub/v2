import React from 'react'
import { Box } from 'rebass'
import theme, { cx } from '../theme'

const Button = Box.extend.attrs({
  is: 'a',
  f: 3,
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
  lineHeight: 1.125,
  display: 'inline-block',
  verticalAlign: 'middle',
  textAlign: 'center',
  textDecoration: 'none',
  borderRadius: '4px',
  border: 0,
  appearance: 'none',
  boxShadow: '0 2px 12px rgba(0,0,0,.125)',
  transition: '.2s box-shadow ease-out',
  '&:hover, &:focus': {
    outline: 0,
    boxShadow: `0 2px 12px 2px ${props.bg === 'primary' ? 'rgba(228,45,66,.25)' : 'rgba(0,0,0,.25)'}`
  },
  '&:active': {
    outline: 0,
    boxShadow: `0 4px 16px 2px ${props.bg === 'primary' ? 'rgba(228,45,66,.375)' : 'rgba(0,0,0,.375)'}`
  },
  '&:disabled': {
    opacity: 1 / 4
  }
}))

export default Button
