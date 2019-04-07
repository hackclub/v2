import React from 'react'
import styled from 'styled-components'
import { Icon, Text, Link as A, theme } from '@hackclub/design-system'
import { Link } from 'gatsby'
import Sheet from 'components/Sheet'

const Announcement = styled(Sheet).attrs({
  maxWidth: 38,
  p: 2,
  mt: [null, -3, -4, -5],
  mb: [3, 4, 5],
  bg: 'yellow.3',
  color: 'gray.9'
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
    <Icon size={24} glyph="bolt" />
    <Text fontSize={1} mr={1}>
      <strong>Teachers:</strong>
    </Text>
      <Text ml={1} align="left">
        {' '}
        Know motivated students that would make good leaders?
        <br />
        Encourage them to apply below!
      </Text>
    {/*<Announcement.Link to="/flyer.pdf">Download flyer</Announcement.Link>*/}
  </Announcement>
)
