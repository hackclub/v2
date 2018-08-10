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
  py: 2,
  pr: 3
})`
  padding-left: 48px; // 16px icon + 32px padding
  max-width: 100%;
  border: 0;
  line-height: 1.75;
  ${({ theme }) => placeholder({ color: theme.colors.muted })};
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  box-shadow: ${({ theme }) => theme.boxShadows[0]};
  transition: ${({ theme }) => theme.transition} box-shadow;
  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadows[1]};
  }
`

const SearchInput = ({ value, placeholder, label, onChange, ...props }) => (
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

export default SearchInput
