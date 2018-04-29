import React, { Component, Fragment } from 'react'
import Login from 'components/apply/Login'
import LoadingAnimation from 'components/LoadingAnimation'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import api from 'api'

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    api
      .get('v1/users/current')
      .then(user => {
        api
          .get('v1/clubs')
          .then(clubs => {
            this.setState({ status: 'success', clubs })
          })
          .catch(err => {
            throw err
          })
      })
      .catch(err => {
        if (err.status === 401) {
          this.setState({ status: 'needsToAuth' })
        } else {
          this.setState({ status: 'error' })
        }
      })
  }

  render() {
    switch (this.state.status) {
      case 'loading':
        return <LoadingAnimation />
      case 'success':
        return (
          <Fragment>
            <Nav />
            <p>Success</p>
            <p>{JSON.stringify(this.state.clubs)}</p>
          </Fragment>
        )
      case 'needsToAuth':
        return <Login heading="Login to view" />
      default:
        return <ErrorPage />
    }
  }
}
