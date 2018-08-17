import React, { Component } from 'react'
import {
  Container,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  Badge
} from '@hackclub/design-system'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import search from 'search'
import api from 'api'
import { NewClubApplication } from 'models'

const colorMap = {
  unsubmitted: 'gray.3',
  submitted: 'info',
  interviewed: 'accent',
  rejected: 'red.5',
  accepted: 'success'
}

const Revealer = Box.extend`
  transform: scaleY(${props => (props.active ? 1 : 0)});
  height: ${props => (props.active ? 'auto' : '0%')};
  opacity: ${props => (props.active ? 1 : 0)};
  transition: 0.5s ease-in;
`

const Arrow = Text.span.extend.attrs({
  children: '❯'
})`
  transform: rotate(${props => (props.active ? 90 : 0)}deg);
  display: inline-block;
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
    // NewClubApplication.get(id).then(app => {
    //   this.setState({
    //     status: 'success',
    //     app
    //   })
    // }).catch(e => {
    //   this.setState({
    //     status: 'error',
    //     error: e.statusText
    //   })
    // })
    api.get(`v1/new_club_applications`).then(new_club_applications => {
      const app = new_club_applications.find(nca => nca.id === id)
      this.setState({
        status: 'success',
        app
      })
    }).catch(e => {
      this.setState({
        status: 'error',
        error: e.statusText
      })
    })
  }

  render() {
    const { status, error, app } = this.state
    switch(status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <Flex
            flexDirection="column"
            flex="1 1 auto"
            ml={[null, 4]}
            style={{ minWidth: '18rem' }}
          >
            <Text color="muted" f={1} caps mb={3}>
              Application{' '}
              <Badge bg={this.filterApplication(app).color}>
                {app.id}
              </Badge>
            </Text>
            <TestApplicationForm
              application={app}
              updateApplicationList={this.updateApplicationList}
            />
            <Collapsable heading="Reject">
              <RejectionForm
                application={app}
                updateApplicationList={this.updateApplicationList}
              />
            </Collapsable>
            <Collapsable heading="Notes">
              <NotesForm
                modelId={app.id}
                modelType="new_club_applications"
              />
            </Collapsable>
            <Collapsable heading="Interview">
              <InterviewForm
                application={app}
                updateApplicationList={this.updateApplicationList}
              />
            </Collapsable>
            <Collapsable heading="Application">
              <Information application={app} />
            </Collapsable>
            <Collapsable heading="Accept">
              <AcceptanceForm
                application={app}
                updateApplicationList={this.updateApplicationList}
              />
            </Collapsable>
          </Flex>
        )
      case 'error':
        return <ErrorPage message={error} />
    }
  }
}
