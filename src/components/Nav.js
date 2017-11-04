import React from 'react'
import { Box, Flex, Image } from 'rebass'
import { Link } from 'react-static'
import { colors, mx } from '../theme'

const Base = Flex.extend.attrs({
  px: 4,
  py: 1,
  justify: 'space-between',
  w: 1
})`
  z-index: 4;
`

const Logo = Image.extend.attrs({ w: 48 })`
  border-radius: 2rem;
`

const Nav = Flex.extend.attrs({ is: 'nav', align: 'center', mx: -3 })(
  [],
  props =>
    props.cloud
      ? {
          backgroundColor: 'rgba(255,255,255,.98)',
          boxShadow: '0 0 1rem 1rem rgba(255,255,255,.98)',
          borderRadius: '2rem',
          color: colors.slate
        }
      : { color: colors.white }
)

const Item = Box.extend.attrs({ mx: 3 })`
  color: inherit;
  text-decoration: none;
  font-weight: bold;
`

export default ({ cloud, ...props }) => (
  <Base {...props}>
    <Link to="/">
      <Logo src="/logo-nav.png" alt="Hack Club logo" />
    </Link>
    <Nav cloud={cloud}>
      <Item is="a" href="/workshops" children="Workshops" />
      <Item is={Link} to="/team" children="Our Team" />
    </Nav>
  </Base>
)
