import React, { Component } from 'react'
import LoadingAnimation from 'components/LoadingAnimation'
import Login from 'components/apply/Login'
import EventForm from 'components/admin/events/EventForm'
import api from 'api'
import storage from 'storage'
import search from 'search'
import { Text } from '@hackclub/design-system'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      event: undefined,
      status: 'loading'
    }

    this.updateEvent = this.updateEvent.bind(this)
  }

  updateEvent(event) {
    this.setState({ event })
    search.set('id', event.id)
  }

  componentDidMount() {
    const authToken = storage.get('authToken')
    const eventId = search.get('id')
    api.get('v1/users/current', { authToken }).then(() => {
      if (eventId) {
        return api
          .get('v1/events')
          .then(events => {
            const event = events.find(event => event.id.toString() === eventId)
            if (event) {
              this.setState({
                event,
                status: 'success'
              })
            } else {
              throw 'Event not found'
            }
          })
          .catch(err => {
            this.setState({
              status: err.status === 401 ? 'needsToAuth' : 'failure'
            })
          })
      } else {
        this.setState({ event: {}, status: 'success' })
      }
    })
  }

  render() {
    const { status, event } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'needsToAuth':
        return <Login userType="admin" />
      case 'success':
        return <EventForm event={event} updateEvent={this.updateEvent} />
      default:
        return (
          <Text color="error" py={3} align="center">
            🚨 Something terrible has happened 🚨
          </Text>
        )
    }
  }
}
