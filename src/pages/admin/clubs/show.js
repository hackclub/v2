import React, { Component } from 'react'
import search from 'search'
import api from 'api'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingAnimation from 'components/LoadingAnimation'
import Nav from 'components/apply/ApplyNav'
import { Heading, Text } from '@hackclub/design-system'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      club: {},
      status: 'loading'
    }
  }
  componentDidMount() {
    const clubId = search.get('id')
    api
      .get(`v1/clubs/${clubId}`)
      .then(club => {
        this.setState({
          status: 'success',
          club
        })
      })
      .catch(err => {
        this.setState({
          status: err.status === 401 ? 'needsToAuth' : 'failure'
        })
      })
  }
  render() {
    const { status } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'success':
        {
          /* This is placeholder while the backend is missing this endpoint */
        }
        return (
          <React.Fragment>
            <Nav />
            <Heading>Club #{this.state.club.id}</Heading>
            <Text>
              This will show information as soon as the backend has a route for
              getting new_club information
            </Text>
          </React.Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}
