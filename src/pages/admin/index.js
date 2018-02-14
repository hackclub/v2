import React, { Component } from 'react'
import {
  ThemeProvider,
  Container,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Badge,
  Link
} from '@hackclub/design-system'
import { AutoSaver, Field, Form } from 'components/Forms'
import Login from 'components/apply/Login'
import { Tr, Td, Th } from 'components/Table'
import LogoutButton from 'components/apply/LogoutButton'
import LoadingAnimation from 'components/LoadingAnimation'
import api from 'api'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = { status: 'loading' }
    this.updateApplicationList = this.updateApplicationList.bind(this)
  }

  componentDidMount() {
    const authToken = window.localStorage.getItem('authToken')
    this.setState({ authToken })

    api
      .get('v1/new_club_applications', { authToken })
      .then(json => {
        let clubApplications = {}
        json.forEach(app => {
          if (app.submitted_at) {
            clubApplications[app.id] = app
          }
        })
        this.setState({
          status: 'success',
          clubApplications
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

  updateApplicationList(updatedApplication) {
    const { clubApplications } = this.state
    clubApplications[updatedApplication.id] = updatedApplication

    this.setState({ clubApplications })
  }

  pointOfContact(application) {
    const profile = application.leader_profiles.find(
      profile =>
        profile.user && profile.user.id === application.point_of_contact_id
    )

    return profile && profile.user.email
  }

  active(application) {
    const { selection } = this.state
    return selection && selection.id === application.id
  }

  badgeColor(application) {
    if (application.accepted_at) {
      return 'success'
    } else if (application.rejected_at) {
      return 'primary'
    } else if (application.interviewed_at) {
      return 'accent'
    } else {
      return 'info'
    }
  }

  render() {
    const { authToken, status, clubApplications } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'needsToAuth':
        return <Login userType="admin" />
      case 'success':
        return (
          <Container maxWidth={80} p={[3, 4]}>
            <Flex
              flexDirection={['column', 'row']}
              justify="space-between"
              align="center"
              wrap
            >
              <Heading.h1 f={[5, 6]}>Dashboard</Heading.h1>
              <LogoutButton />
            </Flex>
            <Heading.h2 color="muted" f={4} mt={2} regular>
              Hello, it’s{' '}
              {new Date().toLocaleDateString('en-us', { weekday: 'long' })}
              {'. '}You’re doing great.
            </Heading.h2>
            <Flex mt={[3, 4]}>
              <Badge mr={3} bg="primary">
                Rejected
              </Badge>
              <Badge mr={3} bg="accent">
                Awaiting Interview
              </Badge>
              <Badge mr={3} bg="info">
                Awaiting Decision
              </Badge>
              <Badge mr={3} bg="success">
                Accepted
              </Badge>
            </Flex>
            <Flex justify="center" mt={[3, 4]}>
              <table>
                <thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>POC</Th>
                  </Tr>
                </thead>
                <tbody>
                  {Object.values(clubApplications).map((application, index) => (
                    <Tr key={index} as={Link}>
                      <Td>
                        <Link href={`/admin/application?id=${application.id}`}>
                          <Badge
                            bg={this.badgeColor(application)}
                            children={application.id}
                          />
                        </Link>
                      </Td>
                      <Td>{application.high_school_name}</Td>
                      <Td>{this.pointOfContact(application)}</Td>
                    </Tr>
                  ))}
                </tbody>
              </table>
            </Flex>
          </Container>
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
export default () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
)
