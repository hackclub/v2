import React from 'react'
import styled from 'styled-components'
import { Box, Flex, Input, Icon } from '@hackclub/design-system'
import { placeholder } from 'polished'

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
  border-radius: ${({ theme }) => theme.radii[2]};
  ${({ theme }) => placeholder({ color: theme.colors.muted })};
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  box-shadow: ${({ theme }) => theme.boxShadows[1]},
    0 12px 24px rgba(0, 0, 0, 0.0625);
  transition: ${({ theme }) => theme.transition} box-shadow;
  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadows[2]},
      0 24px 48px rgba(0, 0, 0, 0.125);
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
  }
`

const SearchInput = ({ value, placeholder, label, onChange, ...props }) => (
  <Relative {...props}>
    <Absolute px={3}>
      <Icon name="search" color="muted" size={24} />
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
