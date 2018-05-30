import React, { Component, Fragment } from 'react'
import Login from 'components/apply/Login'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import ClubForm from 'components/checkup/ClubForm'
import LeadershipPositionsForm from 'components/checkup/LeadershipPositionsForm'
import LeaderInviteForm from 'components/checkup/LeaderInviteForm'
import api from 'api'
import search from 'search'
import { Container, Link, Card, Heading, Text } from '@hackclub/design-system'

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
          this.setState({ user, club, status: 'success' })
        })
      )
      .catch(err => {
        console.error(err)
        if (err.status === 401) {
          this.setState({ status: 'needsToAuth' })
        } else {
          this.setState({ status: 'error' })
        }
      })
  }

  render() {
    const { status, club, user } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <Fragment>
            <Nav breadcrumb={false} />
            <Container color="black" p={3} maxWidth={36}>
              <Heading.h2 f={[4, 5]} mt={4}>
                Confirm your club info
              </Heading.h2>
              <Card boxShadowSize="md" p={3} my={3}>
                <ClubForm
                  {...club}
                  redirectUrl={`${location.origin}${
                    location.pathname
                  }/leaders?id=${club.id}`}
                />
              </Card>
            </Container>
          </Fragment>
        )
      case 'needsToAuth':
        return <Login heading="Sign in to view" />
      default:
        return <ErrorPage />
    }
  }
}
