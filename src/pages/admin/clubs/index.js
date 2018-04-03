import React, { Component, Fragment } from 'react'
import {
  Container,
  Button,
  Flex,
  Heading,
  Text,
  Badge
} from '@hackclub/design-system'
import Login from 'components/apply/Login'
import { Tr, Td, Th } from 'components/Table'
import LoadingAnimation from 'components/LoadingAnimation'
import NotesForm from 'components/admin/NotesForm'
import Nav from 'components/apply/ApplyNav'
import ErrorPage from 'components/admin/ErrorPage'
import api from 'api'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading',
      clubs: {}
    }
  }

  componentDidMount() {
    api
      .get('v1/clubs')
      .then(clubs => {
        const clubsObject = clubs.reduce((accumulator, value, index) => {
          accumulator[index] = value
          return accumulator
        }, {})
        this.setState({
          status: 'success',
          clubs: clubsObject
        })
      })
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
        return <LoadingAnimation />
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
                    {Object.values(clubs).map((club, index) => (
                      <Tr
                        key={index}
                        onClick={e => {
                          window.location = `/admin/clubs/show?id=${club.id}`
                        }}
                      >
                        <Td>
                          <Badge bg="slate" children={club.id} />
                        </Td>
                        <Td>{club.name}</Td>
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
