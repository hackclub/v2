import React, { Component, Fragment } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingBar from 'components/LoadingBar'
import Login from 'components/auth/Login'
import Helmet from 'react-helmet'
import Nav from 'components/apply/ApplyNav'
import Fuse from 'fuse.js'
import {
  Text,
  Container,
  Icon,
  Box,
  Flex,
  Field,
  Heading,
  theme
} from '@hackclub/design-system'
import api from 'api'
import styled from 'styled-components'

const FlexCardLink = styled(Flex.withComponent('a'))`
  padding: ${theme.space[3]}px;
  border-top: 1px solid ${theme.colors.smoke};
  align-items: center;

  div {
    flex: 1 1 auto;
  }
`

const ClubCard = ({ visible, high_school_name, id, new_leaders }) =>
  visible ? (
    <FlexCardLink
      boxShadowSize="sm"
      fontSize={3}
      href={`/admin/clubs/edit?id=${id}`}
    >
      <Box align="left" mr={3}>
        <Text bold color="black">
          {high_school_name}
        </Text>
        <Text color="slate" fontSize={1}>
          {new_leaders.map((leader, index) => (
            <Fragment key={leader.id}>
              <Text.span>{leader.name}</Text.span>
              {new_leaders.length - 1 > index && ', '}
            </Fragment>
          ))}
        </Text>
      </Box>
      <Icon glyph="view-forward" color="info" />
    </FlexCardLink>
  ) : null

class SearchInput extends Component {
  state = {
    value: this.props.initialValue || '',
    queryTimeoutId: null
  }

  cancelCurrentTimeout() {
    const { queryTimeoutId } = this.state

    if (queryTimeoutId) {
      window.clearTimeout(queryTimeoutId)
      this.setState({ queryTimeoutId: null })
    }
  }

  handleChange(e) {
    this.cancelCurrentTimeout()

    const value = e.target.value
    const queryTimeoutId = window.setTimeout(() => {
      this.props.callback(value)
    }, 300)
    this.setState({ value, queryTimeoutId })
  }

  componentWillUnmount() {
    this.cancelCurrentTimeout()
  }

  render() {
    return (
      <Field
        placeholder="Search by high school or leaders"
        value={this.state.value}
        onChange={e => this.handleChange(e)}
        my={[3, 5]}
      />
    )
  }
}

export default class extends Component {
  state = { status: 'loading', searchQuery: '' }

  componentDidMount() {
    api
      .currentUser()
      .then(user => {
        api.get(`v1/new_clubs`).then(clubs => {
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
            <Helmet title="Club Dashboard – Hack Club" />
            <Nav />
            <Container maxWidth={32} p={1} w={1}>
              <Heading.h1 fontSize={[5, 6]}>Club Dashboard</Heading.h1>
              <Heading.h2 color="muted" fontSize={4} mt={2} regular>
                Hello, it’s{' '}
                {new Date().toLocaleDateString('en-us', { weekday: 'long' })}
                {'. '}
                You’re doing great.
              </Heading.h2>
              <SearchInput
                callback={searchQuery => this.setState({ searchQuery })}
              />
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
        return <Login userType="admin" />
      case 'error':
      default:
        return <ErrorPage />
    }
  }
}
