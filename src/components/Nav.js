import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@hackclub/design-system'
import Link from 'gatsby-link'
import { colors, mediaQueries } from '@hackclub/design-system'
import Flag from './Flag'

const Base = Flex.extend.attrs({
  pt: 0,
  px: [3, 4],
  pb: 2,
  justify: 'space-between',
  align: 'center',
  w: 1
})`
  position: relative;
  z-index: 4;
`

const NavBar = Flex.withComponent('nav').extend(
  [],
  props =>
    props.mode === 'cloud'
      ? {
          backgroundColor: 'rgba(255,255,255,.98)',
          boxShadow: '0 0 1rem 1rem rgba(255,255,255,.98)',
          borderRadius: '2rem',
          color: colors.slate
        }
      : { color: colors[props.color] || props.color }
)

export const Item = Box.withComponent('a').extend.attrs({ mx: [2, 3] })`
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  text-align: center;

  &:last-of-type {
    display: none;
    ${mediaQueries[1]} {
      display: inline-block;
    }
  }
`

Item.link = Item.withComponent(Link)

const Nav = ({ mode, color, ...props }) => (
  <Base {...props}>
    <Flag />
    <NavBar mode={mode} color={color}>
      <Item.link to="/team" children="Our Team" />
      <Item href="/donate" children="Donate" />
      <Item.link to="/start" children="Start" />
      <Item href="/workshops" children="In a club? Get workshops »" />
    </NavBar>
  </Base>
)

Nav.propTypes = {
  mode: PropTypes.oneOf(['default', 'cloud']),
  color: PropTypes.string,
  authenticated: PropTypes.bool
}

Nav.defaultProps = {
  mode: 'default',
  color: 'white'
}

export default Nav
