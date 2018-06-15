import React, { Component, Fragment } from 'react'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import Helmet from 'react-helmet'
import search from 'search'
import api from 'api'
import { timeSince } from 'helpers'
import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Text
} from '@hackclub/design-system'

const FlexCard = Card.withComponent(Flex)

const EventCard = ({ meeting_date, attendance, notes }) => (
  <FlexCard boxShadowSize="sm" align="flex-start" p={3} my={3}>
    <Badge bg="muted" children={timeSince(Date.parse(meeting_date))} f={2} />
    <Box ml={3}>
      <Heading.h3 f={3} children={meeting_date} />
      <Text color="slate">{attendance} members</Text>
      <Text>{notes}</Text>
    </Box>
  </FlexCard>
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
    console.log(club)
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <Fragment>
            <Helmet title={`Dumb club #${club.id}`} />
            <Nav />
            <Container color="black" maxWidth={36} py={4}>
              <Heading.h1 f={[5, 6]} children={club.high_school_name} />
              {club.club_website && (
                <Flex align="center" f={2} bold mt={3} mb={2}>
                  <Link
                    color="info"
                    target="_blank"
                    href={club.club_website}
                    children={club.club_website}
                  />
                  <Icon size={16} name="open_in_new" color="muted" ml={2} />
                </Flex>
              )}
              <Text f={2} color="muted" children={club.high_school_address} />
              <Heading.h2 f={4} mt={4}>
                Meetings
              </Heading.h2>
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
