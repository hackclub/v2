import React from 'react'
import { Link } from 'react-static'
import { Text, Flex, Box } from 'rebass'
import { cx, mx } from '../theme'
import LogoutButton from './LogoutButton'
import Flag from './Flag'
import styled from 'styled-components'

const Item = Box.extend.attrs({
  f: 4,
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
  color: ${props => cx(props.currentpath === 'true' ? 'muted' : 'primary')};
  text-decoration: none;
  text-transform: capitalize;
`

const Divider = Text.extend.attrs({
  is: 'span',
  mx: 2,
  children: '›',
  color: 'primary'
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
      { path.length > 1 ? <Divider /> : null }
      <Crumb to={link} currentpath={currentPath.toString()}>{name}</Crumb>
    </span>
  )
}

const BreadcrumbHolder = Item.extend.attrs({
  children: Breadcrumb
})`
width: 40em;
text-align: left;
`

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

const ApplyNav = props => {
  const { breadcrumb=true } = props

  return (
    <Base {...props}>
      <Flag/>
      {breadcrumb ? <BreadcrumbHolder /> : null}
      <Logout />
    </Base>
  )
}

export default ApplyNav
