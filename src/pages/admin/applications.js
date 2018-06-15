import React, { Component, Fragment } from 'react'
import {
  Container,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  Badge
} from '@hackclub/design-system'
import { AutoSaver, Field, Form } from 'components/Forms'
import Login from 'components/auth/Login'
import { Tr, Td, Th } from 'components/Table'
import LoadingBar from 'components/LoadingBar'
import InterviewForm from 'components/admin/InterviewForm'
import RejectionForm from 'components/admin/RejectionForm'
import AcceptanceForm from 'components/admin/AcceptanceForm'
import Information from 'components/admin/Information'
import NotesForm from 'components/admin/NotesForm'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import { Formik } from 'formik'
import api from 'api'
import { timeSince } from 'helpers'
import { xor } from 'lodash'

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

const colorMap = {
  unsubmitted: 'gray.3',
  submitted: 'info',
  interviewed: 'accent',
  rejected: 'red.5',
  accepted: 'success'
}

const FilterButton = ({ toggled, status, toggleFilter }) => (
  <Button.button
    mr={2}
    bg={colorMap[status]}
    children={status}
    onClick={() => toggleFilter(status)}
    style={toggled ? null : { opacity: 0.25 }}
  />
)

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
    this.state = {
      status: 'loading',
      filters: ['unsubmitted', 'rejected'],
      clubApplications: {}
    }
    this.updateApplicationList = this.updateApplicationList.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  addAppToList(apps) {
    const { clubApplications } = this.state
    apps.forEach(app => {
      clubApplications[app.id] = app
    })
    this.setState({ clubApplications })
  }

  componentDidMount() {
    api
      .get('v1/new_club_applications?submitted=true')
      .then(apps => {
        this.addAppToList(apps)
        this.setState({ status: 'success' })
      })
      .then(() =>
        api.get('v1/new_club_applications').then(apps => {
          this.addAppToList(apps)
        })
      )
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

  toggleFilter(filter) {
    const { selection, filters } = this.state
    const updatedFilters = xor(filters, [filter])
    this.setState({ filters: updatedFilters })

    // Deselect applications that get filtered out
    if (
      selection &&
      !this.filterApplication(selection, updatedFilters).visible
    ) {
      this.setState({ selection: null })
    }
  }

  filterApplication(application, filters = this.state.filters) {
    let status, updatedAt
    if (application.accepted_at) {
      status = 'accepted'
      updatedAt = timeSince(application.accepted_at)
    } else if (application.rejected_at) {
      status = 'rejected'
      updatedAt = timeSince(application.rejected_at)
    } else if (application.interviewed_at) {
      status = 'interviewed'
      updatedAt = timeSince(application.interviewed_at)
    } else if (application.submitted_at) {
      status = 'submitted'
      updatedAt = timeSince(application.submitted_at)
    } else {
      status = 'unsubmitted'
      updatedAt = timeSince(application.created_at)
    }

    return {
      visible: filters.indexOf(status) === -1,
      selected: this.state.selection === application,
      color: colorMap[status],
      timeInStage: updatedAt
    }
  }

  render() {
    const {
      status,
      clubApplications,
      selection,
      selectType,
      filters
    } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar />
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
                <Heading.h1 f={[5, 6]}>Dashboard</Heading.h1>
              </Flex>
              <Heading.h2 color="muted" f={4} mt={2} regular>
                Hello, it’s{' '}
                {new Date().toLocaleDateString('en-us', { weekday: 'long' })}
                {'. '}You’re doing great.
              </Heading.h2>
              <Flex mt={[3, 4]}>
                {Object.keys(colorMap).map((status, index) => (
                  <FilterButton
                    key={index}
                    toggleFilter={this.toggleFilter}
                    status={status}
                    toggled={this.state.filters.indexOf(status) === -1}
                  />
                ))}
              </Flex>
              <Flex justify="center" mt={[3, 4]}>
                <Box w={1} style={{ overflowY: 'scroll', height: '100vh' }}>
                  <table>
                    <thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>POC</Th>
                        <Th>Time in Stage</Th>
                      </Tr>
                    </thead>
                    <tbody>
                      {Object.values(clubApplications).map(
                        application =>
                          this.filterApplication(application).visible ? (
                            <Tr
                              key={application.id}
                              onClick={() => {
                                const alreadySelected =
                                  this.state.selection === application

                                this.setState({
                                  selection: alreadySelected
                                    ? undefined
                                    : application,
                                  selectType: 'notes'
                                })
                              }}
                            >
                              <Td>
                                <Badge
                                  bg={this.filterApplication(application).color}
                                  children={application.id}
                                />
                              </Td>
                              <Td>{application.high_school_name}</Td>
                              <Td>{this.pointOfContact(application)}</Td>
                              <Td>
                                {
                                  this.filterApplication(application)
                                    .timeInStage
                                }
                              </Td>
                            </Tr>
                          ) : null
                      )}
                    </tbody>
                  </table>
                </Box>
                {selection && (
                  <Flex
                    flexDirection="column"
                    flex="1 1 auto"
                    ml={[null, 4]}
                    style={{ minWidth: '18rem' }}
                  >
                    <Text color="muted" f={1} caps mb={3}>
                      Application{' '}
                      <Badge bg={this.filterApplication(selection).color}>
                        {selection.id}
                      </Badge>
                    </Text>
                    <Collapsable heading="Reject">
                      <RejectionForm
                        application={selection}
                        updateApplicationList={this.updateApplicationList}
                      />
                    </Collapsable>
                    <Collapsable heading="Notes">
                      <NotesForm
                        modelId={selection.id}
                        modelType="new_club_applications"
                      />
                    </Collapsable>
                    <Collapsable heading="Interview">
                      <InterviewForm
                        application={selection}
                        updateApplicationList={this.updateApplicationList}
                      />
                    </Collapsable>
                    <Collapsable heading="Application">
                      <Information application={selection} />
                    </Collapsable>
                    <Collapsable heading="Accept">
                      <AcceptanceForm
                        application={selection}
                        updateApplicationList={this.updateApplicationList}
                      />
                    </Collapsable>
                  </Flex>
                )}
              </Flex>
            </Container>
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}
