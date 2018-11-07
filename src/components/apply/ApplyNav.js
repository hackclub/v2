import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Text, Flex, Box, Link as A } from '@hackclub/design-system'
import Flag from 'components/Flag'
import LogoutButton from 'components/auth/LogoutButton'
import { withRouter } from '@reach/router'
import { startCase, toLower } from 'lodash'

const Crumb = ({ isLast, ...props }) => {
  const Tag = isLast ? Text.span : A.withComponent(Link)
  return <Tag {...props} />
}

class Breadcrumb extends Component {
  state = { path: [] }

  componentDidMount() {
    const path = window.location.pathname.split('/').filter(a => a != '')
    this.setState({ path })
  }

  render() {
    const { path } = this.state
    const runningPath = ['']
    return (
      <>
        {path.map((section, index) => {
          runningPath.push(section)
          const isLast = path.length - index - 1 === 0
          const humanizedSection = startCase(toLower(section))
          return (
            <>
              <Crumb
                to={runningPath.join('/')}
                color={isLast ? 'black' : 'slate'}
                fontSize={3}
                isLast={isLast}
              >
                {humanizedSection}
              </Crumb>
              {!isLast && (
                <Text.span mx={2} color="muted" regular children="›" />
              )}
            </>
          )
        })}
      </>
    )
  }
}

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
    <Flag scrolled />
    {breadcrumb ? (
      <Box fontSize={[2, 4]} mt={2} width={32 * 16}>
        <Breadcrumb />
      </Box>
    ) : null}
    <LogoutButton mt={2} inverted />
  </Flex>
)

export default ApplyNav
