import React, { Component } from 'react'
import search from 'search'
import api from 'api'
import ClubForm from 'components/admin/clubs/ClubForm'
import NotesForm from 'components/admin/NotesForm'
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
      .get(`v1/new_clubs/${clubId}`)
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
    const { status, club } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'success':
        return (
          <React.Fragment>
            <Nav />
            <Heading>Club #{club.id}</Heading>
            {/*<ClubForm {...club} />*/}
            <NotesForm modelId={club.id} modelType="new_clubs" />
          </React.Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}
