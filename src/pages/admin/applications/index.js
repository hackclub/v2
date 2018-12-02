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
import Login from 'components/auth/Login'
import { Tr, Td, Th } from 'components/Table'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import api from 'api'
import storage from 'storage'
import { timeSince } from 'helpers'
import { xor, orderBy } from 'lodash'

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

const Assignment = ({ owner }) => <Text>{owner}</Text>

export default class extends Component {
  state = {
    status: 'loading',
    filters: [],
    clubApplications: {}
  }

  addAppToList(apps) {
    const { clubApplications } = this.state
    apps.forEach(app => {
      clubApplications[app.id] = app
    })
    this.setState({ clubApplications })
  }

  componentDidMount() {
    const filters = storage.get('admin/applications/setting:filters') || [
      'unsubmitted',
      'rejected'
    ]
    this.setState({ filters })
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

  pointOfContact(application) {
    const profile = application.leader_profiles.find(
      profile =>
        profile.user && profile.user.id === application.point_of_contact_id
    )

    return profile && profile.user.email
  }

  toggleFilter(filter) {
    const { selection, filters } = this.state
    const updatedFilters = xor(filters, [filter])
    this.setState({ filters: updatedFilters })
    storage.set('admin/applications/setting:filters', updatedFilters)

    // Deselect applications that get filtered out
    if (
      selection &&
      !this.filterApplication(selection, updatedFilters).visible
    ) {
      this.setState({ selection: null })
    }
  }

  filterApplication(application, filters = this.state.filters) {
    let status, lastStageUpdate
    if (application.accepted_at) {
      status = 'accepted'
      lastStageUpdate = application.accepted_at
    } else if (application.rejected_at) {
      status = 'rejected'
      lastStageUpdate = application.rejected_at
    } else if (application.interviewed_at) {
      status = 'interviewed'
      lastStageUpdate = application.interviewed_at
    } else if (application.submitted_at) {
      status = 'submitted'
      lastStageUpdate = application.submitted_at
    } else {
      status = 'unsubmitted'
      lastStageUpdate = application.created_at
    }

    return {
      ...application,
      visible: filters.indexOf(status) === -1,
      selected: this.state.selection === application,
      color: colorMap[status],
      timeInStage: timeSince(lastStageUpdate),
      lastStageUpdate
    }
  }

  render() {
    const { status, clubApplications, selectType, filters } = this.state
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
                <Heading.h1 fontSize={[5, 6]}>Dashboard</Heading.h1>
              </Flex>
              <Heading.h2 color="muted" fontSize={4} mt={2} regular>
                Hello, it’s{' '}
                {new Date().toLocaleDateString('en-us', { weekday: 'long' })}
                {'. '}
                You’re doing great.
              </Heading.h2>
              <Flex mt={[3, 4]}>
                {Object.keys(colorMap).map((status, index) => (
                  <FilterButton
                    key={index}
                    toggleFilter={::this.toggleFilter}
                    status={status}
                    toggled={this.state.filters.indexOf(status) === -1}
                  />
                ))}
              </Flex>
              <table>
                <thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>POC</Th>
                    <Th>Time in Stage</Th>
                    <Th>Assignment</Th>
                  </Tr>
                </thead>
                <tbody>
                  {orderBy(
                    Object.values(clubApplications).map(c =>
                      this.filterApplication(c)
                    ),
                    'lastStageUpdate',
                    'desc'
                  ).map(application =>
                    application.visible ? (
                      <Tr
                        key={application.id}
                        onClick={e => {
                          location.href = `/admin/applications/edit?id=${
                            application.id
                          }`
                        }}
                      >
                        <Td>
                          <Badge
                            bg={application.color}
                            children={application.id}
                          />
                        </Td>
                        <Td>{application.high_school_name}</Td>
                        <Td>{this.pointOfContact(application)}</Td>
                        <Td>{application.timeInStage}</Td>
                        <Td>
                          {application.owner !== null && (
                            <Assignment owner={application.owner.email} />
                          )}
                        </Td>
                      </Tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </Container>
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}
