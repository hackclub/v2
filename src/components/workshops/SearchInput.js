import React from 'react'
import { Box, Flex, Input, Icon } from '@hackclub/design-system'

const Relative = Box.extend`
  position: relative;
`

const Absolute = Flex.extend`
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
`

const Search = Input.extend.attrs({
  py: 2,
  pr: 3
})`
  padding-left: 48px; // 16px icon + 32px padding
  max-width: 100%;
  border: 0;
  line-height: 1.75;
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  box-shadow: ${({ theme }) => theme.boxShadows[0]};
  transition: ${({ theme }) => theme.transition} box-shadow;
  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadows[1]};
  }
`

export default ({ value, placeholder, label, onChange, ...props }) => (
  <Relative mb={4} {...props}>
    <Absolute px={3}>
      <Icon name="search" color="muted" />
    </Absolute>
    <Search
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type="search"
      aria-label={label}
    />
  </Relative>
)
