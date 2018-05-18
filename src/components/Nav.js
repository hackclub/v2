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

export const Item = A.extend.attrs({
  bold: true,
  my: [1, 0],
  px: [2, 3]
})`color: inherit;`

export const GatsbyItem = Item.withComponent(Link)

const Nav = ({ color = 'white', invertFlag = false, ...props }) => (
  <Base role="banner" {...props}>
    <Flag className={invertFlag && 'invert'} />
    <NavBar role="navigation" ml={-2} py={[1, 0]} color={color} align="center">
      <GatsbyItem to="/team" children="Team" />
      <GatsbyItem to="/donate" children="Donate" />
      <GatsbyItem to="/start" children="Start" />
      <GatsbyItem to="/challenge" children="Challenge" />
      <GatsbyItem to="/workshops" children="Workshops" />
      <Item href="https://hackathons.hackclub.com" children="Hackathons" />
    </NavBar>
  </Base>
)

Nav.propTypes = {
  color: PropTypes.string,
  authenticated: PropTypes.bool,
  invertFlag: PropTypes.bool
}

export default Nav
