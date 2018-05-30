import React, { Component, Fragment } from 'react'
import Login from 'components/apply/Login'
import LoadingAnimation from 'components/LoadingAnimation'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import LeaderForm from 'components/checkup/LeaderForm'
import api from 'api'
import search from 'search'
import {
  Container,
  Card,
  Link,
  Text,
  Heading,
  Section,
  Button,
  Flex,
  Field
} from '@hackclub/design-system'
import { Modal, Overlay, CloseButton } from 'components/Modal'

class SelfForm extends Component {
  state = {
    status: 'ready'
  }

  deletePosition() {
    const { positionId, callback } = this.props
    this.setState({ status: 'deleting' })
    api
      .delete(`v1/leadership_positions/${positionId}`)
      .then(callback)
      .catch(err => {
        console.error(err)
        this.setState({ status: 'error' })
      })
  }

  render() {
    const { status } = this.state
    const { user, club, positionId } = this.props
    switch (status) {
      case 'ready':
        return (
          <Fragment>
            <Text>Will you be a leader next semester?</Text>
            <Flex>
              <Button
                onClick={() => this.setState({ status: 'staying' })}
                bg="success"
                m={2}
                w={1}
              >
                Yes
              </Button>
              <Button
                onClick={() => this.setState({ status: 'confirmDelete' })}
                m={2}
                w={1}
                inverted
              >
                No
              </Button>
            </Flex>
          </Fragment>
        )
      case 'staying':
        return (
          <Fragment>
            <Heading>Complete!</Heading>
            <Text>
              You’re staying as a leader next semester. The checkup is over. You
              can close this window.
            </Text>
          </Fragment>
        )
      case 'confirmDelete':
        return (
          <Fragment>
            <Modal align="left" my={4} p={[3, 4]}>
              <CloseButton onClick={() => this.setState({ status: 'ready' })} />
              <Heading.h2>Are you sure?</Heading.h2>
              <Text my={3}>
                This action <Text.span bold>cannot</Text.span> be undone. This
                will permanently remove you (<Text.span bold>
                  {user.email}
                </Text.span>) from the club at {club.high_school_name}. Please
                type in your email to confirm.
              </Text>
              <Field
                my={3}
                value={this.state.typed}
                onChange={e => {
                  this.setState({ typed: e.target.value })
                }}
              />
              <Text my={3}>
                You will be immediatly logged out and won’t be able to log back
                in.
              </Text>
              <Button
                inverted={user.email !== this.state.typed}
                disabled={user.email !== this.state.typed}
                w={1}
                onClick={() => {
                  if (user.email === this.state.typed) {
                    this.deletePosition()
                  }
                }}
              >
                I understand the consequences, remove me
              </Button>
            </Modal>
            <Overlay onClick={() => this.setState({ status: 'ready' })} />
          </Fragment>
        )
      case 'loading':
        return <LoadingAnimation />
    }
  }
}

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    const id = search.get('id')
    api
      .get(`v1/users/current`)
      .then(user =>
        api.get(`v1/new_clubs/${id}`).then(club => {
          const position = club.leadership_positions.find(
            position => (position.new_leader_id = user.new_leader.id)
          )
          if (position) {
            this.setState({
              user,
              club,
              positionId: position.id,
              status: 'success'
            })
          } else {
            this.setState({ user, club, status: 'deleted' })
          }
        })
      )
      .catch(err => {
        console.error(err)
        if (err.status === 401) {
          this.setState({ status: 'needsToAuth' })
        } else if (err.status === 403) {
          this.setState({ status: 'deleted' })
        } else {
          this.setState({ status: 'error' })
        }
      })
  }

  render() {
    const { status, user, club, positionId } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'success':
        return (
          <Fragment>
            <Nav breadcrumb={false} />
            <Container my={3} maxWidth={32}>
              <Card FlexShadowSize="sm" p={3}>
                <SelfForm
                  user={user}
                  club={club}
                  positionId={positionId}
                  callback={() => this.setState({ status: 'deleted' })}
                />
              </Card>
            </Container>
          </Fragment>
        )
      case 'deleted':
        return (
          <Fragment>
            <Nav breadcrumb={false} />
            <Container my={3} maxWidth={32}>
              <Heading>Removed</Heading>
              <Text>You are no longer marked as a club leader.</Text>
              <Text>
                If you removed yourself by accident, please contact me at{' '}
                <Link href="mailto:max@hackclub.com">max@hackclub.com</Link>.
              </Text>
            </Container>
          </Fragment>
        )
      case 'needsToAuth':
        return <Login heading="Login to view" />
      default:
        return <ErrorPage />
    }
  }
}
