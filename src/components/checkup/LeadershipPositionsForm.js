import React, { Component, Fragment } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingBar from 'components/LoadingBar'
import api from 'api'
import {
  Card,
  Text,
  Badge,
  Box,
  Heading,
  Link,
  Button,
  Flex,
  Field
} from '@hackclub/design-system'
import { Modal, Overlay, CloseButton } from 'components/Modal'

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'loading':
      return (
        <Badge color="white" bg="slate">
          Loading
        </Badge>
      )
    case 'deleting':
      return (
        <Badge color="white" bg="error">
          Deleting
        </Badge>
      )
    case 'error':
      return (
        <Badge color="white" bg="error">
          Error
        </Badge>
      )
    case 'active':
      return (
        <Badge color="white" bg="success">
          Active
        </Badge>
      )
    case 'invited':
      return (
        <Badge color="white" bg="info">
          Invited
        </Badge>
      )
    case 'rejected':
      return (
        <Badge color="white" bg="accent">
          Rejected invite
        </Badge>
      )
    case 'inactive':
      return (
        <Badge color="white" bg="warning">
          Not leading
        </Badge>
      )
  }
}

const LeaderStatus = ({ status }) => (
  <Text color="slate">
    Status: <StatusBadge status={status} />
  </Text>
)

const LeaderInvite = ({ position }) => {
  const status = position.rejected_at ? 'rejected' : 'invited'
  switch (status) {
    case 'invited':
      return (
        <Fragment>
          <Flex justify="space-between" align="center">
            <Box align="left">
              <LeaderStatus status="invited" />
              <Text>
                <Text.span bold>{position.user.email}</Text.span> needs to
                accept the invite we emailed to them.
              </Text>
            </Box>
            <Button
              inverted
              f={2}
              onClick={() =>
                alert(
                  `Let me know at max@hackclub.com you want invite #${
                    position.id
                  } revoked`
                )
              }
            >
              Revoke
            </Button>
          </Flex>
        </Fragment>
      )
    case 'rejected':
      return (
        <Fragment>
          <LeaderStatus status="rejected" />
          <Text>
            <Text.span bold>{position.user.email}</Text.span> rejected the
            invitation.
          </Text>
        </Fragment>
      )
  }
}

class LeaderPosition extends Component {
  state = {
    status: 'success',
    typed: ''
  }

  deletePosition() {
    this.setState({ status: 'deleting' })
    api
      .delete(`v1/leadership_positions/${this.props.position.id}`)
      .then(() => {
        this.setState({ status: 'deleted' })
        this.props.callback()
      })
      .catch(err => {
        console.error(err)
        this.setState({ status: 'error' })
      })
  }

  render() {
    const { position, mine } = this.props
    const { leader_profile, deleted_at } = position
    switch (this.state.status) {
      case 'confirming':
        return (
          <Fragment>
            <Modal align="left" my={4} p={[3, 4]}>
              <CloseButton
                onClick={() => this.setState({ status: 'success' })}
              />
              <Heading.h2>Are you sure?</Heading.h2>
              <Text my={3}>
                This action <Text.span bold>cannot</Text.span> be undone. This
                will permanently remove{' '}
                <Text.span bold>{leader_profile.email}</Text.span> from your
                club’s leadership team. Please type in their email to confirm.
              </Text>
              <Field
                my={3}
                value={this.state.typed}
                onChange={e => {
                  this.setState({ typed: e.target.value })
                }}
              />
              <Button
                inverted={leader_profile.name !== this.state.typed}
                disabled={leader_profile.name !== this.state.typed}
                w={1}
                onClick={() => {
                  if (leader_profile.name === this.state.typed) {
                    this.deletePosition()
                  }
                }}
              >
                I understand the consequences, remove this leader
              </Button>
            </Modal>
            <Overlay onClick={() => this.setState({ status: 'success' })} />
            <LeaderStatus status="loading" />
            <Text color="gray.4">Loading…</Text>
            <LoadingBar />
          </Fragment>
        )
      case 'success':
        return (
          <Fragment>
            <LeaderStatus status={deleted_at ? 'inactive' : 'active'} />
            <Flex justify="space-between" align="center">
              <Box align="left">
                <Heading.h3>{leader_profile.name}</Heading.h3>
                <Text color="muted">{leader_profile.email}</Text>
              </Box>
              {!mine && (
                <Button
                  f={2}
                  inverted
                  onClick={() => this.setState({ status: 'confirming' })}
                >
                  Remove
                </Button>
              )}
            </Flex>
          </Fragment>
        )
      case 'deleting':
      case 'deleted':
        return (
          <Fragment>
            <LeaderStatus status="loading" />
            <Flex justify="space-between" align="center">
              <Box align="left">
                <Heading.h3>{leader_profile.name}</Heading.h3>
                <Text color="muted">{leader_profile.email}</Text>
              </Box>
            </Flex>
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}

const PositionCard = Card.extend.attrs({
  p: 3,
  my: 3,
  boxShadowSize: 'sm'
})``

export default class extends Component {
  state = {
    status: 'loading'
  }

  render() {
    const { positions, callback, leaderId } = this.props
    return (
      <Fragment>
        {positions.invites
          .concat(positions.leaders)
          // invites with accepted_at should already have leader positions
          .filter(position => !position.accepted_at)
          .sort((a, b) => a.created_at > b.created_at)
          .map(position => (
            <PositionCard key={position.id}>
              {position.sender ? (
                <LeaderInvite position={position} />
              ) : (
                <LeaderPosition
                  position={position}
                  mine={leaderId === position.new_leader_id}
                  callback={callback}
                />
              )}
            </PositionCard>
          ))}
      </Fragment>
    )
  }
}
