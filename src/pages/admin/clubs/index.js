import React, { Component, Fragment } from 'react'
import {
  Container,
  Button,
  Flex,
  Heading,
  Text,
  Badge
} from '@hackclub/design-system'
import Login from 'components/auth/Login'
import { Tr, Td, Th } from 'components/Table'
import LoadingBar from 'components/LoadingBar'
import NotesForm from 'components/admin/NotesForm'
import Nav from 'components/apply/ApplyNav'
import ErrorPage from 'components/admin/ErrorPage'
import { NewClub } from 'models'

export default class extends Component {
  state = { status: 'loading', clubs: null }

  componentDidMount() {
    NewClub.all()
      .then(clubs => this.setState({ clubs, status: 'success' }))
      .catch(e => {
        if (e.status === 401) {
          this.setState({ status: 'needsToAuth' })
        } else {
          this.setState({ status: 'error' })
        }
      })
  }

  render() {
    const { status, clubs } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'needsToAuth':
        return <Login userType="admin" />
      case 'success':
        return (
          <Fragment>
            <Nav />
            <Container maxwidth={80} p={[3, 4]}>
              <Flex
                flexDirection={['column', 'row']}
                justify="space-between"
                align="center"
                wrap
              >
                <Heading.h1 f={[5, 6]}>Club Dashboard</Heading.h1>
              </Flex>
              <Heading.h2 color="muted" f={4} mt={2} regular>
                Hello, it’s{' '}
                {new Date().toLocaleDateString('en-us', { weekday: 'long' })}
                {'. '}You’re doing great.
              </Heading.h2>
              <Flex justify="center" mt={[3, 4]}>
                <table>
                  <thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                    </Tr>
                  </thead>
                  <tbody>
                    {Object.values(clubs).map(club => (
                      <Tr
                        key={club.id}
                        onClick={e => {
                          window.location = `/admin/clubs/edit?id=${club.id}`
                        }}
                      >
                        <Td>
                          <Badge bg="slate" children={club.id} />
                        </Td>
                        <Td>{club.high_school_name}</Td>
                      </Tr>
                    ))}
                  </tbody>
                </table>
              </Flex>
            </Container>
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}
