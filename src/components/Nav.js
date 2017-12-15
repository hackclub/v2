import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from 'rebass'
import { Link } from 'react-static'
import { colors, mx } from '../theme'
import Flag from './Flag'

const Base = Flex.extend.attrs({
  pt: 0,
  px: [3, 4],
  pb: 2,
  justify: ['center', 'space-between'],
  w: 1
})`
  position: relative;
  z-index: 4;
`

const NavBar = Flex.extend.attrs({ is: 'nav', align: 'center', mr: -3 })(
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

const Item = Box.extend.attrs({ mx: [2, 3] })`
  color: inherit;
  text-decoration: none;
  font-weight: bold;
`

const Nav = ({ mode = 'default', color = colors.white, ...props }) => (
  <Base {...props}>
    <Flag />
    <NavBar mode={mode} color={color}>
      <Item is="a" href="/workshops" children="Workshops" />
      <Item is={Link} to="/team" children="Our Team" />
    </NavBar>
  </Base>
)
Nav.propTypes = {
  mode: PropTypes.oneOf(['default', 'cloud']),
  color: PropTypes.string
}

export default Nav
