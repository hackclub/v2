import React from 'react'
import { Box, Flex, Input, Icon } from '@hackclub/design-system'

const Relative = Box.extend.attrs({
  mb: 4
})`
  position: relative;
`

const Absolute = Box.extend`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
`

const Fill = Flex.extend`
  width: 100%;
  height: 100%;
`

const Search = Input.extend.attrs({
  py: 3,
  pr: 3
})`
  padding-left: 54px;
  box-shadow: ${props => props.theme.boxShadows[0]};
  max-width: 100%;
`

export default ({ value, placeholder, label, onChange, ...props }) => (
  <Relative {...props}>
    <Absolute>
      <Fill align="center" px={3}>
        <Icon name="search" color="muted" />
      </Fill>
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
