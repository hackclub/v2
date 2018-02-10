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

const cloud = props =>
  props.mode === 'cloud'
    ? {
        backgroundColor: 'rgba(255,255,255,.98)',
        boxShadow: '0 0 1rem 1rem rgba(255,255,255,.98)',
        borderRadius: '2rem',
        color: props.theme.colors.slate
      }
    : { color: cx(props.color) }

const NavBar = Flex.withComponent('nav').extend.attrs({ ml: -2, py: 1 })`
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  ${cloud};
`

export const Item = A.extend.attrs({
  align: 'center',
  bold: true,
  my: 1,
  px: [2, 3]
})`color: inherit;`

Item.link = Item.withComponent(Link)

const Nav = ({ mode, color, ...props }) => (
  <Base {...props}>
    <Flag />
    <NavBar mode={mode} color={color} align="center">
      <Item.link to="/team" children="Team" />
      <Item href="/donate" children="Donate" />
      <Item.link to="/start" children="Start" />
      <Item.link to="/workshops" children="Workshops" />
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
