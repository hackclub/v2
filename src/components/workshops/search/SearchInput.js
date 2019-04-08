import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Icon, Input, theme } from '@hackclub/design-system'

const Relative = styled(Box)`
  position: relative;
`

const Absolute = styled(Flex)`
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
`

const Search = styled(Input).attrs({
  bg: 'white',
  py: 2,
  pr: 3
})`
  padding-left: 48px; // 16px icon + 32px padding
  line-height: 48px;
  max-width: 100%;
  border: 0;
  border-radius: ${theme.radii[2]};
  font-size: ${theme.fontSizes[3]}px;
  box-shadow: ${theme.boxShadows[1]}, 0 16px 32px rgba(0, 0, 0, 0.0625);
  transition: ${theme.transition} box-shadow;
  &:hover,
  &:focus {
    box-shadow: ${theme.boxShadows[1]}, 0 16px 48px rgba(0, 0, 0, 0.125);
  }
  ${theme.mediaQueries.md} {
    font-size: ${theme.fontSizes[4]}px;
  }
  ::placeholder {
    color: ${theme.colors.muted};
  }
`

const SearchInput = ({ value, placeholder, label, onChange, ...props }) => (
  <Relative {...props}>
    <Absolute color="muted" px={2}>
      <Icon glyph="search" size={36} />
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

export default SearchInput
