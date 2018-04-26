import React, { Component, Fragment } from 'react'
import {
  Box,
  Flex,
  Text,
  Heading,
  Link,
  Button,
  Icon
} from '@hackclub/design-system'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingBar from 'components/LoadingBar'
import PropTypes from 'prop-types'

const Header = Flex.extend`
  align-items: baseline;
  border-bottom: 1px solid ${props => props.theme.colors.smoke};
`

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  render() {
    const { status, name, url } = this.props
    return (
      <Fragment>
        <Header pb={1}>
          <Heading.h2 f={5} children={name} />
          <Link href={url} target="_blank" ml={2}>
            <Icon name="open_in_new" color="info" size={24} />
          </Link>
        </Header>
        {status === 'loading' && <LoadingBar />}
        {status === 'error' && <ErrorPage />}
        {status === 'success' && (
          <Fragment>
            <Text>Success!</Text>
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default Comments
