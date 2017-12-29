import React, { Component } from 'react'
import { api } from '../../data'
import { Provider, Text } from 'rebass'
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
  <Button is={Link} {...props} />
)

const ApplicationCard = props => (
  <ListItem to={`/apply/edit?id=${props.app.id}`}>Update at {props.app.updated_at}</ListItem>
)

const ApplicationListing = props => (
  <ul>
    {props.apps.map((app, index) => (
      <ApplicationCard app={app} key={index} />
    ))}
  </ul>
)

const NewApplicationButton = withRouter(props => {
  const { applicantId, authToken } = props
  const handleClick = (e) => {
    e.preventDefault()
    fetch(`${api}/v1/applicants/${applicantId}/club_applications`, {
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
       props.history.push({pathname: '/apply/edit', search: `?id=${json.id}`})
     })
     .catch(e => {
       console.error(e)
     })
  }

  return <ListItem onClick={handleClick} to='/apply/edit'>Start a new application</ListItem>
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
    fetch(`${api}/v1/applicants/${applicantId}/club_applications`, {
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

    if (status === 'loading') {
      return (
        <Provider theme={theme}>
          <LoadingAnimation />
        </Provider>
      )
    } else {
      return (
        <Provider theme={theme}>
          <AuthButtons needsToAuth={status === 'needsToAuth'} />
          <NewApplicationButton authToken={authToken} applicantId={applicantId} />
          <ApplicationListing apps={this.apps} />
        </Provider>
      )
    }
  }
}

export default ApplicationIndex
