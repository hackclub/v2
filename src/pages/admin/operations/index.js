import React, { Component, Fragment } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingBar from 'components/LoadingBar'
import Login from 'components/auth/Login'
import Helmet from 'react-helmet'
import Nav from 'components/apply/ApplyNav'
import Fuse from 'fuse.js'
import { timeSince } from 'helpers'
import {
  Text,
  Card,
  Container,
  Link,
  Icon,
  Flex,
  Box,
  Field
} from '@hackclub/design-system'
import api from 'api'

class ClubCard extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    const { id } = this.props
    api
      .get(`v1/new_clubs/${id}/dumb_check_ins`)
      .then(checkIns => {
        this.setState({ status: 'success', checkIns })
      })
      .catch(err => {
        this.setState({ status: 'error' })
      })
  }

  mostRecentCheckin() {
    const { checkIns } = this.state
    if (checkIns.length > 0) {
      let mostRecentUpdate = new Date(checkIns[0].created_at)
      checkIns.forEach(checkIn => {
        mostRecentUpdate = new Date(
          Math.max(new Date(checkIn.created_at), mostRecentUpdate)
        )
      })
      const daysSinceCheckIn =
        (new Date() - mostRecentUpdate) / (24 * 60 * 60 * 1000)
      let textColor = 'gray.4'
      if (daysSinceCheckIn < 7) {
        textColor = 'gray.8'
      } else if (daysSinceCheckIn < 14) {
        textColor = 'accent'
      } else if (daysSinceCheckIn < 21) {
        textColor = 'warning'
      } else {
        textColor = 'error'
      }
      return (
        <Text color={textColor} f={1}>
          Last checked-in {timeSince(mostRecentUpdate)} ago
        </Text>
      )
    } else {
      return (
        <Text f={1} color="gray.6">
          Never checked in
        </Text>
      )
    }
  }

  renderSwitch() {
    const { status, checkIns } = this.state
    switch (status) {
      case 'success':
        return this.mostRecentCheckin()
      case 'loading':
        return <LoadingBar />
      default:
        return '⚠️ Something broke ⚠️'
    }
  }

  render() {
    if (this.props.visible) {
      return (
        <Link href={`/admin/operations/show?id=${this.props.id}`}>
          <Card boxShadowSize="sm" p={[2, 3]} m={3} f={3}>
            <Flex justify="space-between">
              <Box>
                <Text bold color="slate">
                  {this.props.high_school_name}
                </Text>
                {this.renderSwitch()}
              </Box>
              <Icon name="open_in_new" color="slate" />
            </Flex>
          </Card>
        </Link>
      )
    } else {
      return null
    }
  }
}

export default class extends Component {
  state = {
    status: 'loading',
    searchQuery: '',
    queryUpdatedAt: null
  }

  componentDidMount() {
    api
      .currentUser()
      .then(user => {
        api.get(`v1/new_clubs`).then(originalClubs => {
          const clubs = originalClubs
          this.setState({ user, clubs, status: 'success' })
          const promiseArray = clubs.map(club =>
            api.get(`v1/new_clubs/${club.id}/dumb_check_ins`)
          )
          Promise.all(promiseArray)
        })
        // Normally I'd be using something like 'owner_position', but this isn't implemented yet
        // const clubs = user.leadership_position_invites.map(invite => ({...invite.new_club, check_ins: null}))
        // this.setState({ user, status: 'success', clubs })
        // const clubIds = user.leadership_position_invites.map(invite => invite.new_club.id)
        // const promiseArray = clubIds.map(clubId => api.get(`v1/new_clubs/${clubId}/dumb_check_ins`))

        // Promise.all(promiseArray).then(res => {
        //   console.log(res)
        // })
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

  handleChange(e) {
    this.setState({ searchQuery: e.target.value, queryUpdatedAt: Date.now() })
  }

  render() {
    const { status, clubs, searchQuery } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        const fuse = new Fuse(clubs, {
          threshold: 0.4,
          keys: ['high_school_name']
        })
        const visibleClubIds = fuse.search(searchQuery).map(club => club.id)
        return (
          <Fragment>
            <Helmet title="🛠 Dumb Operations dashboard – Hack Club" />
            <Nav />
            <Container maxWidth={32}>
              {clubs.length > 8 && (
                <Field
                  placeholder="Search by high school"
                  value={searchQuery}
                  onChange={e => this.handleChange(e)}
                  my={5}
                />
              )}
              {clubs.map(club => (
                <ClubCard
                  {...club}
                  key={club.id}
                  visible={
                    searchQuery === '' || visibleClubIds.indexOf(club.id) !== -1
                  }
                />
              ))}
            </Container>
          </Fragment>
        )
      case 'needsToAuth':
        return <Login userType="owner" />
      case 'error':
      default:
        return <ErrorPage />
    }
  }
}
