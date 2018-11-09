import React, { Component } from 'react'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import IconButton from 'components/IconButton'
import Login from 'components/auth/Login'
import Nav from 'components/apply/ApplyNav'
import { Tr, Td, Th } from 'components/Table'
import { Box, Container } from '@hackclub/design-system'
import api from 'api'

export default class extends Component {
  state = {
    events: [],
    status: 'loading'
  }

  componentDidMount() {
    api
      .get('v1/users/current')
      .then(() => {
        return api.get('v1/events').then(events => {
          this.setState({
            events: events.sort(
              (a, b) => new Date(b.start) - new Date(a.start)
            ),
            status: 'success'
          })
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
        return <LoadingBar fill />
      case 'needsToAuth':
        return <Login userType="admin" />
      case 'success':
        return (
          <>
            <Nav />
            <Container maxWidth={36}>
              <Box align="center" py={[3, 4]}>
                <IconButton name="add" bg="success" href="/admin/events/edit">
                  Create new event
                </IconButton>
              </Box>
              <table style={{ margin: 'auto' }}>
                <thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Start Date</Th>
                    <Th>End Date</Th>
                  </Tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <Tr
                      key={event.id}
                      onClick={e => {
                        window.location = `/admin/events/edit?id=${event.id}`
                      }}
                    >
                      <Td>{event.name}</Td>
                      <Td>{event.start}</Td>
                      <Td>{event.end}</Td>
                    </Tr>
                  ))}
                </tbody>
              </table>
            </Container>
          </>
        )
      default:
        return <ErrorPage />
    }
  }
}
