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

const Invite = ({ invite }) => (
  <Card p={2} m={3} boxShadowSize="md" align="center">
    <Heading.h2>{invite.high_school_name}</Heading.h2>
    <Text>{invite.high_school_adress}</Text>
    <Box my={3}>
      <Button color="white" bg="primary" mx={2}>
        Accept
      </Button>
      <Button color="white" bg="primary" mx={2} inverted>
        Reject
      </Button>
    </Box>
  </Card>
)

export default class extends Component {
  state = {
    status: 'success',
    user: {
      leadership_position_invites: [
        {
          high_school_name: 'El Segundo High School',
          high_school_adress: '640 Main St, El Segundo, CA 90245'
        },
        {
          high_school_name: 'Hacking High School',
          high_school_adress:
            'Infinite Loop 1, 1 Infinite Loop, Cupertino, CA 95014'
        }
      ]
    }
  }
  // state = {
  //   status: 'loading'
  // }
  //
  // componentDidMount() {
  //   api.get(`v1/users/current`).then(user => {
  //     this.setState({ status: 'success', user })
  //   }).catch(err => {
  //     if (err.status === 403) {
  //       this.setState({ status: 'needsToAuth' })
  //     } else {
  //       this.setState({ status: 'error' })
  //     }
  //   })
  // }

  render() {
    const { status, user } = this.state
    switch (status) {
      case 'loading':
        return <LoadingPage />
      case 'success':
        return (
          <Fragment>
            <Helmet title="Confirm Invitation – Hack Club" />
            <Nav />
            <Container maxWidth={32}>
              {user.leadership_position_invites.map(invite => (
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
