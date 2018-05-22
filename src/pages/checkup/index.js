import React, { Component, Fragment } from 'react'
import Login from 'components/apply/Login'
import LoadingAnimation from 'components/LoadingAnimation'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import LeaderForm from 'components/checkup/LeaderForm'
import api from 'api'
import {
  Container,
  Card,
  Link,
  Text,
  Heading,
  Section
} from '@hackclub/design-system'

const ClubCard = ({ club }) => (
  <Link href={`/checkup/club?id=${club.id}`}>
    <Card p={3} boxShadowSize="sm">
      <Heading.h2>{club.high_school_name}</Heading.h2>
      <Text>{club.high_school_address}</Text>
    </Card>
  </Link>
)

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    api
      .get('v1/users/current')
      .then(user => {
        this.setState({ user })
        return api
          .get(`v1/new_leaders/${user.new_leader.id}/new_clubs`)
          .then(clubs => {
            this.setState({ clubs, status: 'success' })
          })
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
    switch (this.state.status) {
      case 'loading':
        return <LoadingAnimation />
      case 'success':
        return (
          <Fragment>
            <Nav />
            <Section bg="primary" color="white">
              <Heading.h1 my={3}>Please verify your information</Heading.h1>
            </Section>
            <Container my={3} maxWidth={32}>
              <LeaderForm {...this.state.user} />
              {this.state.clubs.map((club, index) => (
                <ClubCard club={club} key={index} />
              ))}
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
