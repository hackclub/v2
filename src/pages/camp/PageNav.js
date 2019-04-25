import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  Flex,
  Container,
  Text,
  Link
} from '@hackclub/design-system'
import { Content } from 'components/Nav'

const Base = styled(Flex)`
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  z-index: 9997;
  background-color: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid rgba(48, 48, 48, 0.125);
  @supports (position: -webkit-sticky) or (postition: sticky) {
    position: sticky;
  }
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background-color: rgba(255, 255, 255, 0.75);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
  }
`

const Nav = styled(Flex).attrs({ align: 'center' })``

const Logo = styled(Text).attrs({ color: 'black', bold: true, fontSize: 4 })``

const Item = styled(Link).attrs({ color: 'slate', mx: 2, fontSize: 1 })``

const CTA = styled(Button).attrs({ fontSize: 1, px: 2, py: 1, ml: 3 })``

export default () => (
  <Base>
    <Content>
      <Logo>Hack Camp</Logo>
      <Nav>
        <Item href="#overview">Overview</Item>
        <Item href="#overview">Overview</Item>
        <Item href="#overview">Overview</Item>
        <Item href="#overview">Overview</Item>
        <CTA href="https://apply.hackclub.com">Apply</CTA>
      </Nav>
    </Content>
  </Base>
)
