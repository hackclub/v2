import React, { Component } from 'react'
import { Link } from 'react-static'
import { Text, Flex, Box } from 'rebass'
import { cx, mx } from '../theme'
import LogoutButton from './LogoutButton'
import Flag from './Flag'
import styled from 'styled-components'
import { withRouter } from 'react-static'

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
  color: ${props => cx(props.active === 'true' ? 'primary' : 'muted')};
  text-decoration: none;
  text-transform: capitalize;
`

const Divider = Text.extend.attrs({
  is: 'span',
  mx: 2,
  children: '›',
  color: 'primary'
})``

class BreadcrumbClass extends Component {
  constructor(props) {
    super(props)
    this.state = { path: [] }
  }

  componentDidMount() {
    this.setState({ path: location.pathname.split('/').slice(1) })
  }

  render() {
    const { path } = this.state

    let runningPath = ['']
    return (
      <span>
        {path.map((section, index) => {
          runningPath.push(section)
          let isLast = path.length - index > 1
          return (
            <span key={index}>
              <Crumb to={runningPath.join('/')} active={isLast.toString()}>
                {section}
              </Crumb>
              {isLast ? <Divider /> : null}
            </span>
          )
        })}
      </span>
    )
  }
}

const Breadcrumb = withRouter(BreadcrumbClass)

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
  const { breadcrumb = true } = props

  return (
    <Base {...props}>
      <Flag />
      {breadcrumb ? <BreadcrumbHolder /> : null}
      <Logout />
    </Base>
  )
}

export default ApplyNav
