import React, { Component, Fragment } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingAnimation from 'components/LoadingAnimation'
import api from 'api'
import { Card, Text, Badge, Box, Heading } from '@hackclub/design-system'

const StatusBadge = ({status}) => {
  switch(status) {
    case 'loading':
      return <Badge color="white" bg="slate">Loading</Badge>
    case 'error':
      return <Badge color="white" bg="error">Error</Badge>
    case 'active':
      return <Badge color="white" bg="success">Active</Badge>
    case 'invited':
      return <Badge color="white" bg="info">Invited</Badge>
    case 'rejected':
      return <Badge color="white" bg="accent">Rejected invite</Badge>
    case 'inactive':
      return <Badge color="white" bg="warning">Not leading</Badge>
  }
}

const LeaderStatus = ({status}) => (
  <Text color="slate">Status:{' '}
    <StatusBadge status={status} />
  </Text>
)

class LeaderInvite extends Component {
  state = {
    status: 'success'
  }

  render() {
    const { position } = this.props
    switch (this.state.status) {
      case 'success':
        return (
          <Fragment>
            <LeaderStatus status={position.rejected_at ? 'rejected' : 'invited'} />
            <Text>{ position.user.email }</Text>
          </Fragment>
        )
      default:
        return (
          <Fragment>
            <LeaderStatus status="error"/>
            <ErrorPage />
          </Fragment>
        )
    }
  }
}

class LeaderPosition extends Component {
  state = {
    status: 'success'
  }

  render() {
    const { position, deleted_at } = this.props
    const { leader_profile } = position
    switch (this.state.status) {
      case 'loading':
        return (
          <Fragment>
            <LeaderStatus status="loading"/>
            <Box w={1} minHeight={4}>
              <Text color="gray.4">Loading...</Text>
              <LoadingAnimation />
            </Box>
          </Fragment>
        )
      case 'success':
        return (
          <Fragment>
            <LeaderStatus status={deleted_at ? 'inactive' : 'active'}/>
            <Heading.h3>{leader_profile.name}</Heading.h3>
            <Text>{leader_profile.email}</Text>
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}

const PositionCard = Card.extend.attrs({
  p: 3,
  boxShadowSize: 'sm'
})``

export default class extends Component {
  state = {
    status: 'loading'
  }

  render() {
    const { positions } = this.props
    return (
      <Fragment>
        {positions.invites
          .concat(positions.leaders)
          .filter(position => !position.accepted_at)
          .map(position => (
            <PositionCard key={position.id}>
              {position.sender ? (
                <LeaderInvite position={position} />
              ) : (
                <LeaderPosition position={position} />
              )}
            </PositionCard>
          ))}
      </Fragment>
    )
  }
}
