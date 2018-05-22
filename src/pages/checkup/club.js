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
import {} from '@hackclub/design-system'

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    const id = search.get('id')
    api
      .get(`v1/new_clubs/${id}`)
      .then(club => {
        const positions = club.leadership_positions.concat(
          club.leadership_position_invites || []
        )
        this.setState({ club, positions, status: 'success' })
      })
      .catch(err => {
        if (err.status === 401) {
          this.setState({ status: 'needsToAuth' })
        } else {
          this.setState({ status: 'error' })
        }
      })
  }

  render() {
    const { status, club, positions } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'success':
        return (
          <Fragment>
            <Nav />
            <ClubForm {...club} />
            <LeaderInviteForm clubId={club.id} />
            <LeadershipPositionsForm positions={positions} />
          </Fragment>
        )
      case 'needsToAuth':
        return <Login heading="Login to view" />
      default:
        return <ErrorPage />
    }
  }
}
