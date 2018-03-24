import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Link as A, cx, mediaQueries } from '@hackclub/design-system'
import Flag from 'components/Flag'
import Link from 'gatsby-link'

const Base = Flex.extend.attrs({
  pt: 0,
  px: [null, 3, 4],
  pb: 2,
  justify: 'space-between',
  align: 'center',
  w: 1
})`
  position: relative;
  z-index: 4;
`

const NavBar = Flex.withComponent('nav').extend`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`

export const Item = A.withComponent(Link).extend.attrs({
  bold: true,
  my: [1, 0],
  px: [2, 3]
})`color: inherit;`

const Nav = ({ color = 'white', ...props }) => (
  <Base role="banner" {...props}>
    <Flag />
    <NavBar role="navigation" ml={-2} py={[1, 0]} color={color} align="center">
      <Item to="/team" children="Team" />
      <Item to="/donate" children="Donate" />
      <Item to="/start" children="Start" />
      <Item to="/workshops" children="Workshops" />
      <Item to="/hackathons" children="Hackathons" />
    </NavBar>
  </Base>
)

Nav.propTypes = {
  color: PropTypes.string,
  authenticated: PropTypes.bool
}

export default Nav
