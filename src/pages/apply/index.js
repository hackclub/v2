import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { api } from 'data.json'
import {
  ThemeProvider,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  LargeButton,
  Link as DSLink,
  Text,
  cx
} from '@hackclub/design-system'
import ApplyNav from 'components/apply/ApplyNav'
import LeaderInviteForm from 'components/apply/LeaderInviteForm'
import Login from 'components/apply/Login'
import SubmitButton from 'components/apply/SubmitButton'
import LoadingAnimation from 'components/LoadingAnimation'
import fetch from 'unfetch'
import Link from 'gatsby-link'

LargeButton.link = LargeButton.withComponent(Link)

const A = DSLink.extend`
  :hover {
    text-decoration: underline;
  }
`

const timeSince = time => {
  const seconds = Math.floor((new Date() - new Date(time)) / 1000)
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

const Neg = () => <Text.span color="error" bold children="NOT" />

const CustomCard = Card.extend`
  ul {
    padding-left: 0;
  }
`

const ApplicationCard = props => {
  const {
    id,
    leader_profiles,
    updated_at,
    created_at,
    submitted_at
  } = props.app
  const { authToken, callback, app } = props

  const leaderProfile = leader_profiles.find(
    profile => profile.user.id == props.userId
  )
  const coLeaderProfiles = leader_profiles.filter(
    profile => profile.user.id != props.userId
  )

  return (
    <Container maxWidth={36} mt={3} p={3}>
      <Flex
        align="center"
        justify="center"
        flexDirection={['column', 'row']}
        mx={[null, -2]}
      >
        <LargeButton.link
          w={1}
          m={2}
          inverted
          to={`/apply/club?id=${id}`}
          children="Edit Application"
        />
        <LargeButton.link
          w={1}
          m={2}
          inverted
          to={`/apply/leader?id=${leaderProfile.id}`}
          children="Edit Leader Profile"
        />
      </Flex>
      <Flex mt={2} mb={4}>
        <SubmitButton authToken={authToken} application={app} />
      </Flex>
      <CustomCard boxShadowSize="md" p={[3, 4]} color="black" bg="snow">
        <Text>You only need a team to apply. Invite them:</Text>
        <LeaderInviteForm id={id} authToken={authToken} callback={callback} />
        <Text>After you submit your application:</Text>
        <ul>
          <li>We’ll get back to you with our decision in 3 days</li>
          <li>
            If you’re accepted, we’ll schedule a call to train you to lead your
            club
          </li>
          <li>
            We’ll give you access to our curriculum, a template for your
            meetings, and our online community of club leaders
          </li>
          <li>
            Once you start holding meetings, we’ll check in with you each week
            to make sure everything is going well
          </li>
        </ul>
        <p>
          Contact us at <A href="mailto:team@hackclub.com">team@hackclub.com</A>{' '}
          if you have any questions while applying.
        </p>
        <ul>
          <li>
            This application was{' '}
            {submitted_at !== null
              ? 'submitted'
              : updated_at === created_at ? 'created' : 'updated'}{' '}
            {timeSince(updated_at)} ago
          </li>
          <li>
            You have {leaderProfile.completed_at ? null : <Neg />} finished your
            leader profile
          </li>
          {coLeaderProfiles.map((profile, index) => (
            <li key={index}>
              <strong>{profile.user.email} </strong>
              {profile.completed_at ? null : (
                <span>
                  has <Neg />{' '}
                </span>
              )}
              finished their leader profile
            </li>
          ))}
        </ul>
        <Text color="slate" f={1}>
          <em>
            * We also accept applications from clubs that have already held
            meetings.
          </em>
        </Text>
      </CustomCard>
    </Container>
  )
}

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'loading',
      app: undefined,
      authToken: undefined,
      userId: undefined
    }

    this.populateApplications = this.populateApplications.bind(this)
  }

  populateApplications(
    authToken = this.state.authToken,
    userId = this.state.userId
  ) {
    fetch(`${api}/v1/users/${userId}/new_club_applications`, {
      headers: { Authorization: `Bearer ${authToken}` }
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
          return fetch(`${api}/v1/users/${userId}/new_club_applications`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${authToken}` }
          }).then(res => {
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
          this.setState({ status: 'needsToAuth' })
        }
      })
  }

  componentDidMount() {
    const authToken = window.localStorage.getItem('authToken')
    const userId = window.localStorage.getItem('userId')
    this.setState({ authToken, userId })
    const needsToAuth = authToken === null || userId === null

    if (needsToAuth) {
      this.setState({ status: 'needsToAuth' })
    } else {
      this.populateApplications(authToken, userId)
    }
  }

  content() {
    const { app, status, authToken, userId } = this.state

    switch (status) {
      case 'needsToAuth':
        return <Login />
      case 'loading':
        return <LoadingAnimation />
      case 'finished':
        return (
          <Fragment>
            <ApplyNav breadcrumb={0} />
            <Heading.h1
              bg="primary"
              color="white"
              f={[5, 6]}
              mt={-1}
              py={4}
              px={3}
              align="center"
            >
              Apply to Hack Club
            </Heading.h1>
            <ApplicationCard
              app={app}
              userId={userId}
              authToken={authToken}
              callback={this.populateApplications}
            />
          </Fragment>
        )
      default:
        return <Text>Something terrible has happened.</Text>
    }
  }

  render() {
    return (
      <ThemeProvider>
        <Helmet title="Apply – Hack Club" />
        {this.content()}
      </ThemeProvider>
    )
  }
}
