import styled from 'styled-components'
import React, { Component, Fragment } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingBar from 'components/LoadingBar'
import Login from 'components/auth/Login'
import Helmet from 'react-helmet'
import Nav from 'components/apply/ApplyNav'
import Fuse from 'fuse.js'
import Chart from 'components/admin/operations/CheckInChart'
import { timeSince, formatDate } from 'helpers'
import {
  Text,
  Card,
  Container,
  Link,
  Icon,
  Flex,
  Box,
  Field,
  Heading
} from '@hackclub/design-system'
import api from 'api'

const FlexCardLink = styled(Card.withComponent('a'))`
  display: flex;
  align-items: center;

  div {
    flex: 1 1 auto;
  }
`

class ClubCard extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    api
      .get(`v1/new_clubs/${this.props.id}/dumb_check_ins`)
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
      const checkInData = checkIns.slice(0, 6).map(checkIn => ({
        y: checkIn.attendance || 0,
        x: formatDate('mmm dd', checkIn.meeting_date)
      }))
      return (
        <Fragment>
          <Text color={textColor} f={1}>
            Last checked-in {timeSince(mostRecentUpdate)}
          </Text>
          <Flex mt={3}>
            {checkIns.length > 1 && <Chart data={checkInData} />}
          </Flex>
        </Fragment>
      )
    } else {
      return (
        <Text f={1} color="muted">
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
    if (!this.props.visible) return null
    return (
      <FlexCardLink
        boxShadowSize="sm"
        p={[2, 3]}
        m={3}
        f={3}
        href={`/admin/operations/club?id=${this.props.id}`}
      >
        <Box align="left" mr={3}>
          <Text bold color="black">
            {this.props.high_school_name}
          </Text>
          <Text color="slate" f={1}>
            {this.props.new_leaders.map((leader, index) => (
              <Fragment key={leader.id}>
                <Text.span>{leader.name}</Text.span>
                {this.props.new_leaders.length - 1 > index && ', '}
              </Fragment>
            ))}
          </Text>
          {this.renderSwitch()}
        </Box>
        <Icon name="chevron_right" color="info" />
      </FlexCardLink>
    )
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
        api.get(`v1/new_clubs/owned`).then(clubs => {
          this.setState({ user, clubs, status: 'success' })
        })
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
          keys: ['high_school_name', 'new_leaders.name', 'new_leaders.email']
        })
        const visibleClubIds = fuse.search(searchQuery).map(club => club.id)
        return (
          <Fragment>
            <Helmet title="🛠 Dumb Operations Dashboard – Hack Club" />
            <Nav />
            <Container maxWidth={32}>
              {clubs.length > 8 && (
                <Field
                  placeholder="Search by high school or leaders"
                  value={searchQuery}
                  onChange={e => this.handleChange(e)}
                  mt={5}
                />
              )}
              <Box mx={-3}>
                {clubs.map(club => (
                  <ClubCard
                    {...club}
                    key={club.id}
                    visible={
                      searchQuery === '' ||
                      visibleClubIds.indexOf(club.id) !== -1
                    }
                  />
                ))}
              </Box>
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
