import React, { Component, Fragment } from 'react'
import LoadingBar from 'components/LoadingBar'
import Login from 'components/auth/Login'
import EventForm from 'components/admin/events/EventForm'
import ImageForm from 'components/admin/events/ImageForm'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import api from 'api'
import search from 'search'
import { Text, Image, BackgroundImage } from '@hackclub/design-system'

export default class extends Component {
  state = {
    event: undefined,
    status: 'loading'
  }

  updateEvent(updatedEvent) {
    this.setState({
      event: {
        ...this.state.event,
        ...updatedEvent
      }
    })
    if (!search.get('id') && this.state.event.id) {
      search.set('id', this.state.event.id)
    }
  }

  componentDidMount() {
    const eventId = search.get('id')
    api
      .get('v1/users/current')
      .then(() => {
        if (eventId) {
          return api
            .get('v1/events')
            .then(events => {
              const event = events.find(
                event => event.id.toString() === eventId
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
              throw err
            })
        } else {
          this.setState({ event: {}, status: 'success' })
        }
      })
      .catch(err => {
        this.setState({
          status: err.status === 401 ? 'needsToAuth' : 'failure'
        })
      })
  }

  render() {
    const { status, event } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'needsToAuth':
        return <Login userType="admin" />
      case 'success':
        return (
          <Fragment>
            <Nav />
            <ImageForm
              type="logo"
              updateEvent={::this.updateEvent}
              image={event && event.logo}
              previewTag={({ imageUrl }) => (
                <Image src={imageUrl} height="60px !important" />
              )}
            />
            <ImageForm
              type="banner"
              updateEvent={::this.updateEvent}
              image={event && event.banner}
              previewTag={({ imageUrl }) => (
                <BackgroundImage
                  /* BackgroundImage doesn’t support height yet */
                  height="150px"
                  width={350}
                  src={imageUrl}
                />
              )}
            />
            <EventForm event={event} updateEvent={::this.updateEvent} />
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}
