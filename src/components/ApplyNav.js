import React, { Component } from 'react'
import { Link } from 'react-static'
import { Text, Flex, Box, Link as A } from '@hackclub/design-system'
import { cx, mx } from '../theme'
import { Item } from './Nav'
import LogoutButton from './LogoutButton'
import Flag from './Flag'
import styled from 'styled-components'
import { withRouter } from 'react-static'

const Crumb = A.withComponent(Link).extend`
  opacity: ${props => (props.active === 'true' ? 0.8 : 1)};
  text-transform: capitalize;
`

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
      <React.Fragment>
        {path.map((section, index) => {
          runningPath.push(section)
          const isLast = path.length - index > 1
          return (
            <React.Fragment>
              <Crumb
                color="white"
                to={runningPath.join('/')}
                active={isLast.toString()}
              >
                {section}
              </Crumb>
              {isLast ? (
                <Text.span mx={2} color="white" regular children="›" />
              ) : null}
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }
}

const Breadcrumb = withRouter(BreadcrumbClass)

// Prevent validateDOMNesting error
Item.box = Item.withComponent(Box)

const ApplyNav = ({ breadcrumb = true, ...props }) => (
  <Flex
    bg="primary"
    px={[2, 4]}
    pb={2}
    justify="space-between"
    align="center"
    w={1}
    style={{ position: 'relative' }}
    {...props}
  >
    <Flag />
    {breadcrumb ? (
      <Item.box f={[2, 4]} mt={2} w={32 * 16}>
        <Breadcrumb />
      </Item.box>
    ) : null}
    <LogoutButton mt={2} />
  </Flex>
)

export default ApplyNav
