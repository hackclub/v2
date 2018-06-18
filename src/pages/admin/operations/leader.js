import React, { Component } from 'react'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import search from 'search'
import api from 'api'

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    const id = search.get('id')
    // This endpoint isn't live yet, so this page will fail to load
    api
      .get(`v1/new_leaders/${id}`)
      .then(leader => {
        this.setState({ leader, status: 'success' })
      })
      .catch(err => {
        switch (err.status) {
          case 401:
          case 403:
            this.setState({ status: 'needsToAuth' })
            break
          default:
            this.setState({ status: 'error' })
            break
        }
      })
  }

  render() {
    const { status, leaders } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <Fragment>
            <Nav />
            <Helmet title={`Dumb club #${club.id}`} />
            <Container color="black" maxWidth={36} py={4}>
              <Heading.h1 f={[5, 6]} children={club.high_school_name} />
            </Container>
          </Fragment>
        )
      case 'error':
        return <ErrorPage />
    }
  }
}
