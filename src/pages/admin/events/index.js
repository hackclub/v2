import React, { Component, Fragment } from 'react'
import LoadingAnimation from 'components/LoadingAnimation'
import ErrorPage from 'components/admin/ErrorPage'
import Login from 'components/apply/Login'
import Nav from 'components/apply/ApplyNav'
import { Tr, Td, Th } from 'components/Table'
import api from 'api'
import storage from 'storage'
import { Text, Link } from '@hackclub/design-system'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      status: 'loading'
    }
  }

  componentDidMount() {
    const authToken = storage.get('authToken')
    api
      .get('v1/users/current', { authToken })
      .then(() => {
        return api.get('v1/events').then(events => {
          this.setState({ events, status: 'success' })
        })
      })
      .catch(err => {
        this.setState({
          status: err.status === 401 ? 'needsToAuth' : 'failure'
        })
      })
  }

  render() {
    const { status, events } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'needsToAuth':
        return <Login userType="admin" />
      case 'success':
        return (
          <Fragment>
            <Nav />
            <table>
              <thead>
                <Tr>
                  <Th>Name</Th>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Link href="/admin/events/edit">
                    <Td>Create new event</Td>
                  </Link>
                </Tr>
                {events.map((event, index) => (
                  <Tr
                    key={index}
                    onClick={e => {
                      window.location = `/admin/events/edit?id=${event.id}`
                    }}
                  >
                    <Td>{event.name}</Td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}
