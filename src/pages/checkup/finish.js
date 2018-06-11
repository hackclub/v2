import React, { Component, Fragment } from 'react'
import Login from 'components/apply/Login'
import LoadingBar from 'components/LoadingBar'
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
  Button,
  Flex
} from '@hackclub/design-system'

class SelfForm extends Component {
  state = {
    status: 'ready'
  }

  render() {
    const { status } = this.state
    const { user, club, position } = this.props
    switch (status) {
      case 'ready':
        return (
          <Fragment>
            <Heading>Will you lead the club next semester?</Heading>
            <Flex my={3}>
              <Button
                onClick={() => this.setState({ status: 'staying' })}
                bg="success"
                m={2}
                w={1}
              >
                Yes
              </Button>
              <Button
                onClick={() => this.setState({ status: 'leaving' })}
                m={2}
                w={1}
                inverted
              >
                No
              </Button>
            </Flex>
          </Fragment>
        )
        debugger
      case 'leaving':
        return (
          <Fragment>
            <Heading>Leaving?</Heading>
            <Text my={3}>
              Sorry to hear you’re leaving. Before you go, we would like to have
              an exit interview. It will be a short (~10 minutes) call to talk
              about your time with your club.
            </Text>
            <Button href="https://exit-interview.hackclub.com" w={1}>
              Schedule the call
            </Button>
          </Fragment>
        )
      case 'staying':
        return (
          <Fragment>
            <Heading>Complete!</Heading>
            <Text my={3}>
              You’re leading your club next semester. The checkup is over. You
              can close this window.
            </Text>
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
            this.setState({ user, club, position, status: 'success' })
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
    const { status, user, club, position } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <Fragment>
            <Nav breadcrumb={false} />
            <Container my={3} maxWidth={32}>
              <Card FlexShadowSize="sm" p={3}>
                <SelfForm
                  user={user}
                  club={club}
                  position={position}
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
