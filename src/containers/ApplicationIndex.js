import React, { Component } from 'react'
import { api } from '../../data'
import { Box, Provider, Text, Small } from 'rebass'
import Button from '../components/Button'
import theme from '../theme'
import LoadingAnimation from '../components/LoadingAnimation'
import { LoginButton, LogoutButton } from '../components/AuthButton'
import fetch from 'unfetch'
import { withRouter, Link } from 'react-static'

const AuthButtons = props => {
  if (props.needsToAuth) {
    return (
      <div>
        <Text>There's something wrong with your session. Please try logging in again.</Text>
        <LoginButton />
      </div>
    )
  } else {
    return (<LogoutButton />)
  }
}

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

const ApplicationListing = props => (
  <ul>
    {props.apps.map((app, index) => (
      <ApplicationCard key={index} app={app} {...props} />
    ))}
  </ul>
)

const NewApplicationButton = withRouter(props => {
  const { applicantId, authToken } = props
  const handleClick = (e) => {
    e.preventDefault()
    fetch(`${api}/v1/applicants/${applicantId}/new_club_applications`, {
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
     .then(json => {
       console.log(json)
       props.history.push({pathname: '/apply/club', search: `?id=${json.id}`})
     })
     .catch(e => {
       console.error(e)
     })
  }

  return <ListItem onClick={handleClick} to='/apply/club'>Start a new application</ListItem>
})

class ApplicationIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'loading',
      authToken: null,
      applicantId: null
    }
  }

  componentDidMount() {
    const authToken = window.localStorage.getItem('authToken')
    const applicantId = window.localStorage.getItem('applicantId')

    // Ensure user is authenticated
    if (authToken === null || applicantId === null) {
      this.props.history.push('/apply/login')
    }

    this.setState({authToken, applicantId})
    console.log(this.state)

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
        this.apps = json
        console.log(json)
        this.setState({
          status: 'finshed'
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

  render() {
    const { status, authToken, applicantId } = this.state

    return (
      <Provider theme={theme}>
        <AuthButtons needsToAuth={status === 'needsToAuth'} />
        {
          status === 'loading' ?
          <LoadingAnimation /> :
          <div>
            <NewApplicationButton authToken={authToken} applicantId={applicantId} />
            <ApplicationListing apps={this.apps} applicantId={applicantId} />
          </div>
        }
      </Provider>
    )
  }
}

export default ApplicationIndex
