import React, { Component, Fragment } from 'react'
import Login from 'components/apply/Login'
import LoadingAnimation from 'components/LoadingAnimation'
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
        return <LoadingAnimation />
      case 'success':
        return (
          <Fragment>
            <Nav breadcrumb={false} />
            <Container my={3} maxWidth={32}>
              <Heading.h2>Club leadership</Heading.h2>
              <Text my={3}>
                This is a list of your current leadership team. You can use this
                page to:
              </Text>
              <ul>
                <li>
                  Remove club leaders who won’t be leading the club next year
                </li>
                <li>Invite new leaders</li>
              </ul>
              <LeadershipPositionsForm
                positions={positions}
                leaderId={user.new_leader.id}
                callback={this.refresh}
              />
              <LeaderInviteForm clubId={club.id} callback={this.refresh} />
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
