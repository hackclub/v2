import React, { Component, Fragment } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingBar from 'components/LoadingBar'
import LoginPage from 'components/auth/Login'
import LeaderForm from 'components/confirm_invite/LeaderForm'
import Nav from 'components/apply/ApplyNav'
import api from 'api'
import Helmet from 'react-helmet'
import {
  Container,
  Card,
  Heading,
  Button,
  Badge,
  Text,
  Box
} from '@hackclub/design-system'
import { Modal, Overlay, CloseButton } from 'components/Modal'

class Invite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: props.accepted
        ? 'accepted'
        : props.rejected
          ? 'rejected'
          : 'undecided',
      formActive: false
    }
    this.rejectInvite = this.rejectInvite.bind(this)
    this.acceptInvite = this.acceptInvite.bind(this)
    this.submitAcceptance = this.submitAcceptance.bind(this)
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
    const { invite, user } = this.props
    if (user.new_leader) {
      this.setState({ status: 'loading' })
      this.submitAcceptance()
    } else {
      this.setState({ status: 'loading', showForm: true })
    }
  }

  submitAcceptance(newLeader) {
    const { invite, updateLeader } = this.props
    if (newLeader) {
      updateLeader(newLeader)
    }
    this.setState({ showForm: false })
    return api
      .post(`v1/leadership_position_invites/${invite.id}/accept`)
      .then(res => {
        this.setState({ status: 'accepted' })
      })
  }

  renderSwitch() {
    const { status, showForm } = this.state
    const { invite, user } = this.props
    switch (status) {
      case 'loading':
        return (
          <Fragment>
            <Button bg="warning">Loading…</Button>
            {showForm && (
              <Fragment>
                <Modal align="left" my={4} p={[3, 4]}>
                  <CloseButton
                    onClick={() =>
                      this.setState({ status: 'undecided', showForm: false })
                    }
                  />
                  <LeaderForm
                    email={user.email}
                    userId={user.id}
                    clubId={invite.new_club.id}
                    callback={this.submitAcceptance}
                  />
                </Modal>
                <Overlay
                  onClick={() =>
                    this.setState({ status: 'undecided', showForm: false })
                  }
                />
              </Fragment>
            )}
          </Fragment>
        )
      case 'accepted':
        return <Badge bg="success">Invite accepted</Badge>
      case 'rejected':
        return <Badge bg="error">Invite rejected</Badge>
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
  constructor(props) {
    super(props)
    this.state = { status: 'loading' }
    this.updateLeader = this.updateLeader.bind(this)
  }

  componentDidMount() {
    api
      .get(`v1/users/current`)
      .then(user => {
        this.setState({ user })
        const promiseArray = user.leadership_position_invites.map(invite =>
          api.get(`v1/leadership_position_invites/${invite.id}`)
        )
        return Promise.all(promiseArray)
      })
      .then(invites => {
        const sortedInvites = invites.sort(
          (a, b) => a.created_at < b.created_at
        )
        const pendingInviteCount = invites.filter(
          invite => !invite.rejected_at && !invite.accepted_at
        ).length
        this.setState({
          invites: sortedInvites,
          pendingInviteCount,
          status: 'success'
        })
      })
      .catch(err => {
        if (err.status === 403 || err.status === 401) {
          this.setState({ status: 'needsToAuth' })
        } else {
          this.setState({ status: 'error' })
        }
      })
  }

  updateLeader(newLeader) {
    this.setState({
      user: {
        ...this.state.user,
        new_leader: newLeader
      }
    })
  }

  render() {
    const { status, invites, pendingInviteCount, leader, user } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <Fragment>
            <Helmet title="Confirm Invitation – Hack Club" />
            <Nav />
            <Container maxWidth={32}>
              {pendingInviteCount === 0 && (
                <Box>
                  <Heading.h2 my={3} align="center">
                    All done!
                  </Heading.h2>
                  <Text align="center">
                    You’ve responded to all your invites.
                  </Text>
                </Box>
              )}
              {invites.map(invite => (
                <Invite
                  key={invite.id}
                  invite={invite}
                  user={user}
                  updateLeader={this.updateLeader}
                  rejected={invite.rejected_at !== null}
                  accepted={invite.accepted_at !== null}
                />
              ))}
              {invites.length === 0 && (
                <Box>
                  <Heading.h2 my={3} align="center">
                    No invites here!
                  </Heading.h2>
                  <Text align="center">
                    We couldn’t find any invites for{' '}
                    <Text.span bold>{user.email}</Text.span>. This could mean
                    you signed in with the wrong email address or your invite
                    was revoked by the sender.
                  </Text>
                </Box>
              )}
            </Container>
          </Fragment>
        )
      case 'needsToAuth':
        return <LoginPage heading="Confirm your invite" />
      default:
        return <ErrorPage />
    }
  }
}
