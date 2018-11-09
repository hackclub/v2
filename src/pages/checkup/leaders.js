import React, { Component } from 'react'
import Login from 'components/auth/Login'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import LeadershipPositionsForm from 'components/checkup/LeadershipPositionsForm'
import LeaderInviteForm from 'components/checkup/LeaderInviteForm'
import api from 'api'
import search from 'search'
import { Container, Heading, Text, Button } from '@hackclub/design-system'

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    this.refresh = this.refresh.bind(this)
    this.refresh()
  }

  refresh() {
    const id = search.get('id')
    api
      .get(`v1/users/current`)
      .then(user => {
        this.setState({ user })
        return api.get(`v1/new_clubs/${id}`).then(club => {
          const positions = {
            leaders: club.leadership_positions.map(position => {
              const leader_profile = club.new_leaders.find(
                leader => leader.id === position.new_leader_id
              )
              return { ...position, leader_profile }
            }),
            invites: club.leadership_position_invites
          }

          this.setState({ club, positions, status: 'success' })
        })
      })
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
    const { status, club, positions, user } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <>
            <Nav breadcrumb={false} />
            <Container color="black" p={3} maxWidth={36}>
              <Heading.h2 fontSize={5} mt={4}>
                Update your club leadership team
              </Heading.h2>
              <Heading.h3 fontSize={4} mt={4} mb={2}>
                Your current team
              </Heading.h3>
              <LeadershipPositionsForm
                positions={positions}
                leaderId={user.new_leader.id}
                callback={this.refresh}
              />
              <Heading.h3 fontSize={4} mt={4} mb={2}>
                Add a new leader
              </Heading.h3>
              <LeaderInviteForm clubId={club.id} callback={this.refresh} />
              <Heading.h2 mt={4}>Finish</Heading.h2>
              <Text my={3}>
                Once this list is up-to-date you can continue to the final page
              </Text>
              <Button
                bg="info"
                href={`/checkup/finish?id=${club.id}`}
                mt={3}
                width={1}
                fontSize={4}
              >
                Continue
              </Button>
            </Container>
          </>
        )
      case 'needsToAuth':
        return <Login heading="Sign in to view" />
      default:
        return <ErrorPage />
    }
  }
}
