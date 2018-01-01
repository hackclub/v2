import React, { Component } from 'react'
import { api } from '../../data'
import { Card, Container, Box, Flex, Lead, Provider } from 'rebass'
import Button from '../components/Button'
import theme, { cx, mx } from '../theme'
import LoadingAnimation from '../components/LoadingAnimation'
import Login from '../components/Login'
import Nav from '../components/Nav'
import fetch from 'unfetch'
import { Link } from 'react-static'

const EditButton = Button.extend.attrs({
  f: 3,
  is: () => Link,
  px: 4,
  py: 4,
  mx: 'auto',
  my: 1,
  w: 1
})`
text-align: left;
&:hover {
  /* background: ${cx('accent')};*/
}
${mx[1]} {
  width: 90%;
}
`

const InfoCard = Card.extend.attrs({
  bg: 'smoke',
  p: 4,
})`
border-radius: 4px;
box-shadow: 0 2px 12px rgba(0,0,0,.125);
`

const ApplicationCardContainer = Container.extend.attrs({
  mx: 'auto',
  p: 4
})`
max-width: 75rem;
`

const CustomFlex = Flex.extend.attrs({
  wrap: true,
  my: 3
})``

const CustomBox = Box.extend.attrs({
  width: 1,
  my: 3
})`
${mx[1]} {
  width: 50%;
}
`

const ApplicationCard = props => {
  const { id, applicant_profiles } = props.app

  const leaderProfile = applicant_profiles.find(profile => (
    profile.applicant.id == props.applicantId
  ))

  return (
    <Container my="auto">
      <CustomFlex>
        <CustomBox>
          <EditButton to={`/apply/club?id=${id}`}>Edit Club Application</EditButton>
          <EditButton to={`/apply/leader?id=${leaderProfile.id}`}>Edit Leader Profile</EditButton>
        </CustomBox>
        <CustomBox>
          <InfoCard>
            <Lead>Application</Lead>
            <ul>
              <li>test</li>
              <li>test</li>
              <li>test</li>
            </ul>
            <Lead>Leaders</Lead>
            <ul>
              <li>test</li>
              <li>test</li>
              <li>test</li>
            </ul>
          </InfoCard>
        </CustomBox>
      </CustomFlex>
    </Container>
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
      this.setState({status: 'needsToAuth'})
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
            this.setState({status: 'needsToAuth'})
          }
        })
    }
  }

  content() {
    const { app, status, authToken, applicantId } = this.state

    switch (status) {
      case 'needsToAuth':
        return <Login />
      case 'loading':
        return <LoadingAnimation />
      case 'finished':
        return (
          <div>
            <Nav authenticated={true} />
            <ApplicationCard app={app} applicantId={applicantId} />
          </div>
        )
      default:
        return <p>Something terrible has happened.</p>
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
