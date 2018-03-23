import React, { Component, Fragment } from 'react'
import LoadingAnimation from 'components/LoadingAnimation'
import Login from 'components/apply/Login'
import EventForm from 'components/admin/events/EventForm'
import ImageForm from 'components/admin/events/ImageForm'
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

    this.eventId = search.get('id')

    this.updateEvent = this.updateEvent.bind(this)
  }

  updateEvent(updatedEvent) {
    this.setState({
      event: {
        ...this.state.event,
        ...updatedEvent
      }
    })
    if (!search.get('id')) {
      search.set('id', this.state.event.id)
    }
  }

  componentDidMount() {
    const authToken = storage.get('authToken')
    api.get('v1/users/current', { authToken }).then(() => {
      if (this.eventId) {
        return api
          .get('v1/events')
          .then(events => {
            const event = events.find(
              event => event.id.toString() === this.eventId
            )
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
        return (
          <Fragment>
            <ImageForm
              name="logo"
              height="60px !important"
              width="60px"
              updateEvent={this.updateEvent}
              image={event && event.logo}
            />
            <ImageForm
              name="banner"
              width="350px"
              height="150px"
              updateEvent={this.updateEvent}
              image={event && event.banner}
            />
            <EventForm event={event} updateEvent={this.updateEvent} />
          </Fragment>
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
