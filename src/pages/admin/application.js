import React, { Component, Fragment } from 'react'
import {
  Container,
  Button,
  Text,
  Flex,
  Box,
  Heading
} from '@hackclub/design-system'
import LogoutButton from 'components/apply/LogoutButton'
import InterviewForm from 'components/admin/InterviewForm'
import RejectionForm from 'components/admin/RejectionForm'
import AcceptanceForm from 'components/admin/AcceptanceForm'
import Information from 'components/admin/Information'
import NotesForm from 'components/admin/NotesForm'
import api from 'api'
import LoadingAnimation from 'components/LoadingAnimation'

const Arrow = Text.span.extend.attrs({
  children: '❯'
})`
  transform: rotate(${props => (props.active ? 90 : 0)}deg);
  display: inline-block;
  transition: 0.5s ease-in;
`

const Revealer = Box.extend`
  transform: scaleY(${props => (props.active ? 1 : 0)});
  height: ${props => (props.active ? 'initial' : '0px')};
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
  }

  componentDidMount() {
    var id
    const params = window.location.search.slice(1).split(/&/)
    for (var i = 0; i < params.length; i++) {
      let param = params[i]
      if (param.split('=')[0] === 'id') {
        id = param.split('=')[1]
      }
    }
    const authToken = window.localStorage.getItem('authToken')
    this.setState({ authToken })
    api
      .get(`v1/new_club_applications/${id}`, { authToken })
      .then(json => {
        this.setState({
          status: 'success',
          application: json
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
    const { status, application, authToken } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'success':
        return (
          <Container maxWidth={80} p={[3, 4]}>
            <Flex
              flexDirection="column"
              justify="space-between"
              align="flex-start"
              ml={[null, 4]}
            >
              <Heading.h1 f={[5, 6]}>{application.high_school_name}</Heading.h1>
              <Flex flexDirection="row">
                <Button.link to="/admin" inverted>
                  « Back
                </Button.link>
                <LogoutButton />
              </Flex>
              <Text color="muted" f={1} caps mb={3}>
                Application #{application.id}
              </Text>
              <Collapsable heading="Reject">
                <RejectionForm
                  authToken={authToken}
                  application={application}
                  updateApplicationList={this.updateApplicationList}
                />
              </Collapsable>
              <Collapsable heading="Notes">
                <NotesForm authToken={authToken} application={application} />
              </Collapsable>
              <Collapsable heading="Interview">
                <InterviewForm
                  authToken={authToken}
                  application={application}
                  updateApplicationList={this.updateApplicationList}
                />
              </Collapsable>
              <Collapsable heading="Application">
                <Information application={application} />
              </Collapsable>
              <Collapsable heading="Accept">
                <AcceptanceForm
                  authToken={authToken}
                  application={application}
                  updateApplicationList={this.updateApplicationList}
                />
              </Collapsable>
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
