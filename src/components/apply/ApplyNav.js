import React, { Component, Fragment } from 'react'
import Link from 'gatsby-link'
import { Text, Flex, Box, Link as A } from '@hackclub/design-system'
import Flag from 'components/Flag'
import LogoutButton from 'components/auth/LogoutButton'
import { startCase, toLower } from 'lodash'

const Crumb = ({ isLast, ...props }) => {
  const Tag = isLast ? Text.span : A.withComponent(Link)
  return <Tag {...props} />
}

class BreadcrumbClass extends Component {
  state = { path: [] }

  componentDidMount() {
    const path = window.location.pathname
      .split('/')
      .filter(chunk => chunk !== '')
    this.setState({ path })
  }

  render() {
    const { path } = this.state
    const runningPath = ['']
    return (
      <Fragment>
        {path.map((section, index) => {
          runningPath.push(section)
          const isLast = path.length - index - 1 === 0
          const humanizedSection = startCase(toLower(section))
          return (
            <Fragment key={index}>
              <Crumb
                to={runningPath.join('/')}
                color={isLast ? 'black' : 'slate'}
                fontSize={3}
                isLast={isLast}
              >
                {humanizedSection}
              </Crumb>
              {!isLast ? (
                <Text.span mx={2} color="muted" regular children="›" />
              ) : null}
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
}

const Breadcrumb = BreadcrumbClass

const ApplyNav = ({ breadcrumb = true, ...props }) => (
  <Flex
    px={[3, 4]}
    pb={2}
    justify="space-between"
    align="center"
    width={1}
    style={{ position: 'relative' }}
    {...props}
  >
    <Flag />
    {breadcrumb && (
      <Box fontSize={[2, 4]} mt={2} width={32 * 16}>
        <Breadcrumb />
      </Box>
    )}
    <LogoutButton mt={2} inverted />
  </Flex>
)

export default ApplyNav
