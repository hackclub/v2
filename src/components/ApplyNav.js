import React from 'react'
import { withRouter, Link } from 'react-static'
import { Text, Flex, Box } from 'rebass'
import { cx, mx } from '../theme'
import { LogoutButton } from './AuthButton'
import Flag from './Flag'
import styled from 'styled-components'

const Item = Box.extend.attrs({
  mx: 2,
  mt: 4,
  color: 'primary'
})`
text-decoration: none;
font-weight: bold;
text-align: center;
max-width: 10em;
radius: 4px;

${mx[1]} {
  max-width: none;
}
`

const Crumb = styled(Link)`
  color: ${props => cx(props.currentpath === 'true' ? 'primary' : 'muted')};
  text-decoration: none;
`

const Divider = Text.extend.attrs({
  is: 'span',
  mx: 2,
  children: '›',
  color: 'muted'
})``

const Breadcrumb = props => {
  const { path=location.pathname.split('/'), currentPath=true } = props

  if (path.length <= 1) {
    return null
  }

  const name = path.pop()
  const link = currentPath ? '#' : `${path.join('/')}/${name}`
  return (
    <span>
      <Breadcrumb path={path} currentPath={false} />
      <Divider />
      <Crumb to={link} currentpath={currentPath.toString()}>{name}</Crumb>
    </span>
  )
}

const Logout = Item.extend.attrs({
  is: () => LogoutButton
})``

const Base = Flex.extend.attrs({
  pt: 0,
  px: [3, 4],
  pb: 2,
  justify: 'space-between',
  w: 1
})`
  position: relative;
`

const ApplyNav = props => (
  <Base {...props}>
    <Flex>
      <Flag />
      <Item>
        <Breadcrumb />
      </Item>
    </Flex>
    <Logout />
  </Base>
)

export default ApplyNav
