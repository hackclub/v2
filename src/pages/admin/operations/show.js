import React, { Component, Fragment } from 'react'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import Helmet from 'react-helmet'
import search from 'search'
import api from 'api'
import { timeSince } from 'helpers'
import { Text, Card, Container } from '@hackclub/design-system'

const EventCard = ({ meeting_date, attendance, notes }) => (
  <Card boxShadowSize="sm" p={3} my={3}>
    <Text>
      Meeting {timeSince(Date.parse(meeting_date))} ago ({meeting_date})
    </Text>
    <Text>{attendance} members</Text>
    <Text>{notes}</Text>
  </Card>
)

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    const id = search.get('id')
    api
      .get(`v1/new_clubs/${id}`)
      .then(club =>
        api.get(`v1/new_clubs/${id}/dumb_check_ins`).then(unsortedCheckIns => {
          const checkIns = unsortedCheckIns.sort(
            (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
          )
          this.setState({ club, checkIns, status: 'success' })
        })
      )
      .catch(err => {
        switch (err.status) {
          case 401:
          case 403:
            this.setState({ status: 'needsToAuth' })
            break
          default:
            this.setState({ status: 'error' })
            break
        }
      })
  }

  render() {
    const { status, club, checkIns } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <Fragment>
            <Nav />
            <Helmet title={`Dumb club #${club.id}`} />
            <Container maxWidth={48}>
              {checkIns.map(checkIn => (
                <EventCard {...checkIn} key={checkIn.index} />
              ))}
            </Container>
          </Fragment>
        )
      case 'error':
        return <ErrorPage />
    }
  }
}
