import React, { Component, Fragment } from 'react'
import { Link } from 'gatsby'
import { Text, Flex, Box, Link as A } from '@hackclub/design-system'
import { Item } from 'components/Nav'
import Flag from 'components/Flag'
import LogoutButton from 'components/auth/LogoutButton'
import { withRouter } from 'react-router-dom'
import { startCase, toLower } from 'lodash'

const Crumb = A.withComponent(Link).extend`
  opacity: ${props => (props.active === 'true' ? 0.8 : 1)};
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
    const runningPath = ['']
    return (
      <Fragment>
        {path.map((section, index) => {
          runningPath.push(section)
          const isLast = path.length - index > 1
          const humanizedSection = startCase(toLower(section))
          return (
            <Fragment key={index}>
              <Crumb
                color="white"
                to={runningPath.join('/')}
                active={isLast.toString()}
              >
                {humanizedSection}
              </Crumb>
              {isLast ? (
                <Text.span mx={2} color="white" regular children="›" />
              ) : null}
            </Fragment>
          )
        })}
      </Fragment>
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
    <LogoutButton mt={2} inverted />
  </Flex>
)

export default ApplyNav
