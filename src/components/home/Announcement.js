import React from 'react'
import styled from 'styled-components'
import { Icon, Text, Link as A, theme } from '@hackclub/design-system'
import { Link } from 'gatsby'
import Sheet from 'components/Sheet'

const Announcement = styled(Sheet).attrs({
  width: 1,
  maxWidth: 36,
  p: 2,
  mt: [null, -3, -4, -5],
  mb: [3, 4, 5],
  bg: 'dark',
  color: 'smoke'
})`
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    text-shadow: none;
  }
  span {
    display: none;
    ${theme.mediaQueries.sm} {
      display: inline;
    }
  }
`
Announcement.Link = styled(A.withComponent(Link)).attrs({
  caps: true,
  color: 'info',
  bold: true,
  fontSize: 2,
  ml: 'auto',
  chevronRight: true
})``

export default () => (
  <Announcement>
    <Icon size={24} glyph="bank-circle" />
    <Text fontSize={1} ml={1}>
      <strong>Hack Club Bank 1.0</strong>
      <Text.span ml={1}>
        {'– '}
        redesigned & open to all
      </Text.span>
    </Text>
    <Announcement.Link to="/bank/">Learn more</Announcement.Link>
  </Announcement>
)
