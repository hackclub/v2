import React, { Component, Fragment } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingPage from 'components/LoadingAnimation'
import LoginPage from 'components/apply/Login'
import Nav from 'components/apply/ApplyNav'
import api from 'api'
import Helmet from 'react-helmet'
import {
  Container,
  Card,
  Heading,
  Button,
  Text,
  Box
} from '@hackclub/design-system'

class Invite extends Component {
  constructor(props) {
    super(props)
    this.state = { status: 'undecided' }
    this.rejectInvite = this.rejectInvite.bind(this)
    this.acceptInvite = this.acceptInvite.bind(this)
  }

  rejectInvite() {
    const { invite } = this.props
    this.setState({ status: 'loading' })
    api
      .post(`v1/leadership_position_invites/${invite.id}/reject`)
      .then(res => {
        this.setState({ status: 'rejected' })
      })
      .catch(err => {
        console.error(err)
        this.setState({ status: 'error' })
      })
  }

  acceptInvite() {
    const { invite } = this.props
    this.setState({ status: 'loading' })
    api
      .post(`v1/users/${invite.user_id}/new_leader`)
      .then(_leader =>
        api
          .post(`v1/leadership_position_invites/${invite.id}/accept`)
          .then(res => {
            this.setState({ status: 'accepted' })
          })
      )
      .catch(err => {
        console.error(err)
        this.setState({ status: 'error' })
      })
  }

  renderSwitch() {
    switch (this.state.status) {
      case 'loading':
        return <Button bg="warning">Loading...</Button>
      case 'accepted':
        return <Button bg="success">Invite accepted</Button>
      case 'rejected':
        return <Button bg="error">Invite rejected</Button>
      case 'undecided':
        return (
          <Fragment>
            <Button
              color="white"
              bg="primary"
              mx={2}
              onClick={this.acceptInvite}
            >
              Accept
            </Button>
            <Button
              color="white"
              bg="primary"
              mx={2}
              onClick={this.rejectInvite}
              inverted
            >
              Reject
            </Button>
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }

  render() {
    const { invite } = this.props
    return (
      <Card p={2} m={3} boxShadowSize="md" align="center">
        <Heading.h2>{invite.new_club.high_school_name}</Heading.h2>
        <Text>{invite.new_club.high_school_adress}</Text>
        <Text>
          invited by {invite.sender.username && `${invite.sender.username} `}
          ({invite.sender.email})
        </Text>
        <Box my={3}>{this.renderSwitch()}</Box>
      </Card>
    )
  }
}

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    api
      .get(`v1/users/current`)
      .then(user => {
        const promiseArray = user.leadership_position_invites.map(invite =>
          api.get(`v1/leadership_position_invites/${invite.id}`)
        )
        return Promise.all(promiseArray)
      })
      .then(invites => {
        this.setState({ invites, status: 'success' })
      })
      .catch(err => {
        if (err.status === 403) {
          this.setState({ status: 'needsToAuth' })
        } else {
          this.setState({ status: 'error' })
        }
      })
  }

  render() {
    const { status, invites } = this.state
    switch (status) {
      case 'loading':
        return <LoadingPage />
      case 'success':
        return (
          <Fragment>
            <Helmet title="Confirm Invitation – Hack Club" />
            <Nav />
            <Container maxWidth={32}>
              {invites.map(invite => (
                <Invite key={invite.id} invite={invite} />
              ))}
            </Container>
          </Fragment>
        )
      case 'needsToAuth':
        return <LoginPage />
      default:
        return <ErrorPage />
    }
  }
}
