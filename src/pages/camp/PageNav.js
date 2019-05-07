import React from 'react'
import styled from 'styled-components'
import { Button, Flex, Text, Link } from '@hackclub/design-system'
import { theme } from './style'
import { Content } from 'components/Nav'

const Base = styled(Flex)`
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  z-index: 9997;
  border-bottom: 1px solid rgba(48, 48, 48, 0.125);
  background-color: rgba(0, 0, 0, 0.875);
  color: ${theme.colors.white};
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background-color: rgba(32, 34, 36, 0.875);
    -webkit-backdrop-filter: saturate(180%) blur(16px);
  }
`

const Nav = styled(Flex).attrs({ align: 'center' })``

const Logo = styled(Text).attrs({ color: 'white', bold: true, fontSize: 4 })``

const Item = styled(Link).attrs({ color: 'smoke', mx: 2, fontSize: 1 })`
  display: none;
  ${theme.mediaQueries.md} {
    display: block;
  }
`

const CTA = styled(Button).attrs({
  target: '_blank',
  bg: theme.colors.primary,
  fontSize: 1,
  px: 2,
  py: 1,
  ml: 3,
  mr: [2, null, 0]
})``

export default () => (
  <Base>
    <Content maxWidth={61.25}>
      <Logo>Hack Camp</Logo>
      <Nav>
        <Item href="#overview">Overview</Item>
        <Item href="#activities">Activities</Item>
        <Item href="#logistics">Logistics</Item>
        <CTA href="https://camp-apply.hackclub.com">Apply</CTA>
      </Nav>
    </Content>
  </Base>
)
