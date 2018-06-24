import React, { Component } from 'react'
import Login from 'components/auth/Login'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import Layout from 'components/Layout'
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
            if (clubs.length > 0) {
              const urlBase = window.location.origin + window.location.pathname
              const clubUrl = `${urlBase}/club?id=${clubs[0].id}`
              const clubsUrl = `${urlBase}/clubs`
              this.setState({
                clubs,
                status: 'success',
                redirectUrl: clubs.length === 1 ? clubUrl : clubsUrl
              })
            } else {
              this.setState({ status: 'noClubs' })
            }
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
    const { status, redirectUrl } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <Layout>
            <Nav breadcrumb={false} />
            <Section bg="primary" color="white">
              <Heading.h1 f={[5, 6]} mb={[2, 3]}>
                It’s the end of the school year! 🎉
              </Heading.h1>
              <Text f={[2, 3]}>
                Time to update your club and leader’s info.
              </Text>
            </Section>
            <Container color="black" p={3} maxWidth={36}>
              <Heading.h2 f={[4, 5]} mt={3} mb={2}>
                Update your profile
              </Heading.h2>
              <Text mb={3}>
                You’ll update your co-leaders’ info after the next page
              </Text>
              <Card boxShadowSize="md" p={3} mb={4}>
                <LeaderForm {...this.state.user} redirectUrl={redirectUrl} />
              </Card>
            </Container>
          </Layout>
        )
      case 'noClubs':
        return (
          <Layout>
            <Nav breadcrumb={false} />
            <Container color="black" p={3} maxWidth={36} align="center">
              <Heading.h2 f={[4, 5]} mt={3} mb={3}>
                No Clubs Found
              </Heading.h2>
              <Text>
                We couldn’t find any clubs associated with your email.
              </Text>
            </Container>
          </Layout>
        )
      case 'needsToAuth':
        return <Login heading="Sign in to view" />
      default:
        return <ErrorPage />
    }
  }
}
