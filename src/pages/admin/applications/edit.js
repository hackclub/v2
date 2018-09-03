import React, { Component, Fragment } from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  Badge
} from '@hackclub/design-system'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import IsTestForm from 'components/admin/IsTestForm'
import RejectionForm from 'components/admin/RejectionForm'
import NotesForm from 'components/admin/NotesForm'
import InterviewForm from 'components/admin/InterviewForm'
import AcceptanceForm from 'components/admin/AcceptanceForm'
import Information from 'components/admin/Information'
import Nav from 'components/apply/ApplyNav'
import search from 'search'
import api from 'api'
import { NewClubApplication } from 'models'
import { timeSince } from 'helpers'

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

const Revealer = Box.extend`
  transform: scaleY(${props => (props.active ? 1 : 0)});
  height: ${props => (props.active ? 'auto' : '0')};
  opacity: ${props => (props.active ? 1 : 0)};
  transition: ${props => (props.active ? '0.1s ease-out' : '0.5s ease-in')};
`

const Arrow = Text.span.extend.attrs({
  children: '❯'
})`
  transform: rotate(${props => (props.active ? 90 : 0)}deg);
  display: inline-block;
  transition: ${props => (props.active ? '0.2s ease-out' : '0.3s ease-in')};
`

class Collapsable extends Component {
  state = { status: false }

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
        this.setState({
          status: 'success',
          app
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
  updateApplication = this.updateApplication.bind(this)

  render() {
    const { status, error, app } = this.state
    switch (status) {
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
                <Information application={app} />
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
