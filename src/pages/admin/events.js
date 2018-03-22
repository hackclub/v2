import React, { Component } from 'react'
import LoadingAnimation from 'components/LoadingAnimation'
import Login from 'components/apply/Login'
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
          <table>
            <thead>
              <Tr>
                <Th>Name</Th>
              </Tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <Tr
                  key={index}
                  onClick={e => {
                    window.location = `/admin/event?id=${event.id}`
                  }}
                >
                  <Td>{event.name}</Td>
                  <Td />
                </Tr>
              ))}
            </tbody>
          </table>
        )
      default:
        return (
          <Text color="error" py={3} align="center">
            🚨 Something terrible has happened 🚨
          </Text>
        )
    }
  }
}
