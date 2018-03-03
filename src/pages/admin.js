import React, { Component, Fragment } from 'react'
import {
  Container,
  Box,
  Flex,
  Heading,
  Text,
  Badge
} from '@hackclub/design-system'
import { AutoSaver, Field, Form } from 'components/Forms'
import Login from 'components/apply/Login'
import { Tr, Td, Th } from 'components/Table'
import LogoutButton from 'components/apply/LogoutButton'
import LoadingAnimation from 'components/LoadingAnimation'
import InterviewForm from 'components/admin/InterviewForm'
import RejectionForm from 'components/admin/RejectionForm'
import AcceptanceForm from 'components/admin/AcceptanceForm'
import Information from 'components/admin/Information'
import NotesForm from 'components/admin/NotesForm'
import { Formik } from 'formik'
import api from 'api'

const Arrow = Text.span.extend.attrs({
  children: '❯'
})`
  transform: rotate(${props => (props.active ? 90 : 0)}deg);
  display: inline-block;
  transition: 0.5s ease-in;
`

const Revealer = Box.extend`
  transform: scaleY(${props => (props.active ? 1 : 0)});
  height: ${props => (props.active ? 'auto' : '0%')};
  opacity: ${props => (props.active ? 1 : 0)};
  transition: 0.5s ease-in;
`

class Collapsable extends Component {
  constructor(props) {
    super(props)
    this.state = { status: false }
  }

  render() {
    const { status } = this.state
    return (
      <Fragment>
        <Heading.h2
          my={2}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            this.setState({ status: !status })
          }}
        >
          {this.props.heading} <Arrow ml={2} active={status} />
        </Heading.h2>
        <Revealer active={status}>{this.props.children}</Revealer>
      </Fragment>
    )
  }
}

export default class extends Component {
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

  active(application, prop) {
    const { selection, selectType } = this.state
    return selection && selection.id === application.id && selectType === prop
  }

  badgeColor(application) {
    if (application.accepted_at) {
      return 'success'
    } else if (application.rejected_at) {
      return 'red.5'
    } else if (application.interviewed_at) {
      return 'accent'
    } else {
      return 'info'
    }
  }

  render() {
    const {
      authToken,
      status,
      clubApplications,
      selection,
      selectType
    } = this.state
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
              <Badge mr={3} bg="red.5">
                Rejected
              </Badge>
              <Badge mr={3} bg="info">
                Awaiting Interview
              </Badge>
              <Badge mr={3} bg="accent">
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
                    <Tr
                      key={index}
                      onClick={() => {
                        const alreadySelected =
                          this.state.selection === application

                        this.setState({
                          selection: alreadySelected ? undefined : application,
                          selectType: 'notes'
                        })
                      }}
                    >
                      <Td>
                        <Badge
                          bg={this.badgeColor(application)}
                          children={application.id}
                        />
                      </Td>
                      <Td>{application.high_school_name}</Td>
                      <Td>{this.pointOfContact(application)}</Td>
                    </Tr>
                  ))}
                </tbody>
              </table>
              {selection && (
                <Flex
                  flexDirection="column"
                  flex="1 1 auto"
                  ml={[null, 4]}
                  style={{ minWidth: '18rem' }}
                >
                  <Text color="muted" f={1} caps mb={3}>
                    Application #{selection.id}
                  </Text>
                  <Collapsable heading="Reject">
                    <RejectionForm
                      authToken={authToken}
                      application={selection}
                      updateApplicationList={this.updateApplicationList}
                    />
                  </Collapsable>
                  <Collapsable heading="Notes">
                    <NotesForm authToken={authToken} application={selection} />
                  </Collapsable>
                  <Collapsable heading="Interview">
                    <InterviewForm
                      authToken={authToken}
                      application={selection}
                      updateApplicationList={this.updateApplicationList}
                    />
                  </Collapsable>
                  <Collapsable heading="Application">
                    <Information application={selection} />
                  </Collapsable>
                  <Collapsable heading="Accept">
                    <AcceptanceForm
                      authToken={authToken}
                      application={selection}
                      updateApplicationList={this.updateApplicationList}
                    />
                  </Collapsable>
                </Flex>
              )}
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
