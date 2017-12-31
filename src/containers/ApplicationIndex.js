import React, { Component } from 'react'
import { api } from '../../data'
import { Box, Provider, Text, Small } from 'rebass'
import Button from '../components/Button'
import theme from '../theme'
import LoadingAnimation from '../components/LoadingAnimation'
import Login from '../components/Login'
import { LogoutButton } from '../components/AuthButton'
import fetch from 'unfetch'
import { withRouter, Link } from 'react-static'

const ListItem = props => (
  <Button {...props} is={Link} children={<Text>{props.children}</Text>} />
)

const timeSince = time => {
  const seconds = Math.floor((new Date() - new Date(time)) / 1000);
  const intervals = [
    [Math.floor(seconds / (60 * 60 * 24 * 7)), 'weeks'],
    [Math.floor(seconds / (60 * 60 * 24)), 'days'],
    [Math.floor(seconds / (60 * 60)), 'hours'],
    [Math.floor(seconds / 60), 'minutes']
  ]
  for (var i = 0; i < intervals.length; i++) {
    let interval = intervals[i]
    if (interval[0] > 1) {
      return interval.join(' ')
    }
  }
  return 'less than a minute'
}

const ApplicationCard = props => {
  const leaderProfile = props.app.applicant_profiles.find(profile => (
    profile.applicant.id == props.applicantId
  ))

  return (
    <Box>
      <Text>{props.app.high_school_name || "Untitled Application"}</Text>
      <ListItem to={`/apply/club?id=${props.app.id}`}>
        Edit Club Application
      </ListItem>

      <ListItem to={`/apply/leader?id=${leaderProfile.id}`}>
        Edit Leader Profile
      </ListItem>
      <Small>Last edited {timeSince(props.app.updated_at)} ago</Small>
    </Box>
  )
}

class ApplicationIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'loading',
      authToken: window.localStorage.getItem('authToken'),
      applicantId: window.localStorage.getItem('applicantId')
    }
  }

  componentDidMount() {
    const { authToken, applicantId } = this.state
    const needsToAuth = (authToken === null || applicantId === null)

    this.setState({authToken, applicantId})

    if (needsToAuth) {
      const status = 'needsToAuth'
      this.setState({status})
    } else {
      // Populate the list of applications
      fetch(`${api}/v1/applicants/${applicantId}/new_club_applications`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw res
          }
        })
        .then(json => {
          if (json.length === 0) {
            return fetch(`${api}/v1/applicants/${applicantId}/new_club_applications`, {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${authToken}` }
            })
              .then(res => {
                if (res.ok) {
                  return res.json()
                } else {
                  throw res
                }
              })
          }
          return json.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at)
          })[0]
        })
        .then(app => {
          this.setState({
            status: 'finished',
            app: app
          })
        })
        .catch(e => {
          console.error(e)
          if (e.status === 401) {
            const status = 'needsToAuth'
            this.setState({status})
          }
        })
    }
  }

  content() {
    const { app, status, authToken, applicantId } = this.state

    if (status === 'needsToAuth') {
      return <Login />
    } else if (status === 'loading') {
      return <LoadingAnimation />
    } else if (status === 'finished') {
      return (
        <div>
          <LogoutButton />
          <ApplicationCard app={app} applicantId={applicantId} />
        </div>
      )
    }
  }

  render() {
    return (
      <Provider theme={theme}>
        {this.content()}
      </Provider>
    )
  }
}

export default ApplicationIndex
