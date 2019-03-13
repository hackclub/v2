import styled from 'styled-components'
import React, { Component, Fragment } from 'react'
import {
  Box,
  Heading,
  Text,
  Container,
  Card,
  Badge
} from '@hackclub/design-system'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import IsTestForm from 'components/admin/IsTestForm'
import AssignmentForm from 'components/admin/AssignmentForm'
import RejectionForm from 'components/admin/RejectionForm'
import NotesForm from 'components/admin/NotesForm'
import InterviewForm from 'components/admin/InterviewForm'
import AcceptanceForm from 'components/admin/AcceptanceForm'
import Information from 'components/admin/Information'
import LeaderProfileInfo from 'components/admin/LeaderProfileInfo'
import Nav from 'components/apply/ApplyNav'
import search from 'search'
import { NewClubApplication, LeaderProfile } from 'models'

const colorMap = {
  unsubmitted: 'gray.3',
  submitted: 'info',
  interviewed: 'accent',
  rejected: 'red.5',
  accepted: 'success'
}

const statusColor = app => {
  if (app.accepted_at) {
    return colorMap['accepted']
  } else if (app.rejected_at) {
    return colorMap['rejected']
  } else if (app.interviewed_at) {
    return colorMap['interviewed']
  } else if (app.submitted_at) {
    return colorMap['submitted']
  } else {
    return colorMap['unsubmitted']
  }
}

const Revealer = styled(Box)`
  transform: scaleY(${props => (props.active ? 1 : 0)});
  height: ${props => (props.active ? 'auto' : '0')};
  opacity: ${props => (props.active ? 1 : 0)};
  transition: 0.05s ease-out;
`

const Arrow = styled(Text.span).attrs({
  children: '❯'
})`
  transform: rotate(${props => (props.active ? 90 : 0)}deg);
  display: inline-block;
  transition: ${props => (props.active ? '0.1s ease-out' : '0.2s ease-in')};
`

class Collapsable extends Component {
  state = { status: false }

  render() {
    const { status } = this.state
    return (
      <Card boxShadowSize="sm" my={2} p={3}>
        <Heading.h2
          my={2}
          style={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={() => {
            this.setState({ status: !status })
          }}
          fontSize={this.props.f}
        >
          {this.props.heading} <Arrow ml={2} active={status} />
        </Heading.h2>
        <Revealer active={status}>{this.props.children}</Revealer>
      </Card>
    )
  }
}

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    const id = search.get('id')
    if (!id) {
      this.setState({
        status: 'error',
        error: 'Missing ID in URL'
      })
      return
    }
    NewClubApplication.get(id)
      .then(app => {
        // these names get confusing quickly. Basically "*full* leader profiles" are queried from the API because the "leader profiles" attached to an app don't give all the fields we need.
        // they both get combined into "merged leader profiles"
        const mergedLeaderProfileRequests = app.leader_profiles.map(lp =>
          LeaderProfile.get(lp.id).then(flp => ({ ...flp, ...lp }))
        )
        Promise.all(mergedLeaderProfileRequests).then(mlpRequest => {
          this.setState({
            status: 'success',
            app: { ...app, leader_profiles: mlpRequest }
          })
        })
      })
      .catch(e => {
        this.setState({
          status: 'error',
          error: e.statusText
        })
      })
  }

  updateApplication(app) {
    this.setState({ app })
  }

  render() {
    const { status, error, app } = this.state
    switch (status) {
      default:
        return null
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <Fragment>
            <Nav />
            <Container maxwidth={80} p={[3, 4]}>
              <Heading.h2>
                Application <Badge bg={statusColor(app)}>{app.id}</Badge>
              </Heading.h2>
              <IsTestForm model="new_club_applications" id={app.id} />
              <AssignmentForm id={app.id} />
              <Collapsable heading="Reject">
                <RejectionForm
                  application={app}
                  updateApplication={this.updateApplication}
                />
              </Collapsable>
              <Collapsable heading="Notes">
                <NotesForm modelId={app.id} modelType="new_club_applications" />
              </Collapsable>
              <Collapsable heading="Interview">
                <InterviewForm
                  application={app}
                  updateApplication={this.updateApplication}
                />
              </Collapsable>
              <Collapsable heading="Application">
                <Collapsable
                  heading={`Application: ${app.high_school_name}`}
                  fontSize={4}
                >
                  <Information application={app} />
                </Collapsable>
                {app.leader_profiles.map(lp => (
                  <Collapsable
                    heading={`Leader Profile: ${lp.leader_name}`}
                    fontSize={3}
                    key={lp.id}
                  >
                    <LeaderProfileInfo leaderProfile={lp} />
                  </Collapsable>
                ))}
              </Collapsable>
              <Collapsable heading="Accept">
                <AcceptanceForm
                  application={app}
                  updateApplication={this.updateApplication}
                />
              </Collapsable>
            </Container>
          </Fragment>
        )
      case 'error':
        return <ErrorPage message={error} />
    }
  }
}
