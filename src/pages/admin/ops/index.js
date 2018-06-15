import React, { Component, Fragment } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingBar from 'components/LoadingBar'
import Login from 'components/auth/login'
import { Text } from '@hackclub/design-system'
import api from 'api'

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    api
      .currentUser()
      .then(user => {
        this.setState({ user, status: 'success' })
      })
      .catch(err => {
        switch (err.status) {
          case 401:
          case 403:
            this.setState({ status: 'needsToAuth' })
            break
          default:
            this.setState({ status: 'error' })
        }
      })
  }

  render() {
    switch (this.state.status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <Fragment>
            <Text>Success!</Text>
          </Fragment>
        )
      case 'needsToAuth':
        return <Login userType="owner" />
      case 'error':
      default:
        return <ErrorPage />
    }
  }
}
