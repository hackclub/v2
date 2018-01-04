import React from 'react'
import { Box, Container, Flex, Heading, Text } from 'rebass'
import { colors, mm, mx } from '../theme'
import Button from './Button'
import styled from 'styled-components'

const chevron = () => {
  const props = `xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'`
  const slate = colors.slate.replace('#', '')
  const pathProps = `fill='%23${slate}' d='M2 0L0 2h4zm0 5L0 3h4z'`
  return `%3Csvg ${props}%3E%3Cpath ${pathProps}/%3E%3C/svg%3E`
}
export const Input = Box.extend.attrs({
  is: 'input',
  type: 'text',
  f: 'inherit',
  w: 1,
  m: 0,
  py: 1,
  px: 2,
  color: 'inherit',
  bg: 'transparent'
})([], props => ({
  position: 'relative',
  fontFamily: 'inherit',
  lineHeight: 'inherit',
  display: 'inline-block',
  verticalAlign: 'middle',
  border: 0,
  boxShadow: `inset 0 0 0 1px ${colors.smoke}`,
  borderRadius: '4px',
  appearance: 'none',
  '&:focus': {
    outline: 'none',
    boxShadow: `inset 0 0 0 1px ${colors.info}`
  },
  '&:disabled': {
    opacity: 1 / 4
  },
  '&[type=select]': {
    background: `#fff url("data:image/svg+xml;charset=utf8,${chevron()}") no-repeat right .75rem center`,
    backgroundSize: '.5rem'
  },
  ...props
}))

export const Label = Box.extend.attrs({ is: 'label', f: 2, w: 1 })`
  line-height: 1.5;
`

export const Error = Text.extend.attrs({
  className: 'error',
  color: 'error',
  f: 1,
  ml: 1
})`
  text-transform: lowercase;
  &:before { content: '— '; }
`

export const Required = Text.extend.attrs({
  is: 'span',
  className: 'required',
  color: 'primary',
  f: 1,
  ml: 1,
  children: '*'
})``

export const Field = ({
  type = 'text',
  name = 'name',
  label,
  p,
  children,
  error,
  required,
  ...props
}) => (
  <Label className={type} id={name}>
    <Flex align="center" mb="25rem" style={{ display: 'inline' }} wrap>
      {label}
      {required ? <Required /> : null}
      {error && <Error children={error} />}
    </Flex>
    <Input
      name={name}
      type={type}
      is={['textarea', 'select'].indexOf(type) === -1 ? 'input' : type}
      height={type === 'textarea' ? '10rem' : 'inherit'}
      placeholder={p}
      children={children}
      {...props}
    />
  </Label>
)

export const Submit = props => (
  <Button is="input" type="submit" bg="primary" color="white" {...props} />
)

export const FormWrapper = Flex.extend.attrs({
  is: () => Container
})`
flex-direction: column;
`

const CustomForm = Container.extend.attrs({
  is: 'form',
  py: 4,
  px: 3,
  maxWidth: 50 * 16
})`
  display: grid;
  grid-gap: 1rem;
  ${mx[1]} {
    grid-template-columns: repeat(1, 1fr);
    h2, .textarea { grid-column: 1 / -1; }
  }
`
export const Form = props => (
  <Box>
    <CustomForm {...props} />
  </Box>
)

export const Subheading = Heading.extend.attrs({
  f: 4,
  color: 'primary'
})`
text-transform: capitalize;
`

const CustomFlex = Flex.extend.attrs({})`
${mm[1]} {
  flex-direction: column;
}
`
const HeadingBox = Box.extend.attrs({
  mr: 3
})`
text-align: right;
order: 1;
flex-grow: 0;
flex-shrink: 0;
flex-basis: 7rem;
${mm[1]} {
  flex-basis: auto;
  text-align: left;
}
`
const FieldsBox = Box.extend.attrs({})`
order: 2;
flex-grow: 1;
`
export const Fieldset = props => (
  <CustomFlex>
    <HeadingBox>
      <Subheading id={props.section}>{props.section}</Subheading>
    </HeadingBox>
    <FieldsBox>{props.children}</FieldsBox>
  </CustomFlex>
)

export const Aside = Box.extend.attrs({
  bg: 'snow'
})`
`
