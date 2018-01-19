import React, { Component, Fragment } from 'react'
import { Head } from 'react-static'
import { api } from '../../data'
import {
  ThemeProvider,
  Card,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Button,
  LargeButton,
  Link as DSLink,
  cx
} from '@hackclub/design-system'
import LoadingAnimation from '../components/LoadingAnimation'
import Login from '../components/Login'
import ApplyNav from '../components/ApplyNav'
import fetch from 'unfetch'
import { Link } from 'react-static'

LargeButton.link = LargeButton.withComponent(Link)

const A = DSLink.extend`
  :hover {
    text-decoration: underline;
  }
`

const CustomHeading = props => (
  <Heading.h2
    m={0}
    align={['center', 'left']}
    f={3}
    color="primary"
    caps
    {...props}
  />
)

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

const CustomCard = props => (
  <Card boxShadowSize="md" p={[3, 4]} color="black" bg="snow" {...props} />
)

const ApplicationCard = props => {
  const {
    id,
    applicant_profiles,
    updated_at,
    created_at,
    submitted_at
  } = props.app

  const leaderProfile = applicant_profiles.find(
    profile => profile.applicant.id == props.applicantId
  )
  const coLeaderProfiles = applicant_profiles.filter(
    profile => profile.applicant.id != props.applicantId
  )

  return (
    <Container maxWidth={36} mt={3} p={3}>
      <CustomCard>
        <Text>
          All you need to apply is{' '}
          <A
            href="https://github.com/hackclub/hackclub/blob/master/clubs/leadership_preface.md"
            target="_blank"
          >
            a team
          </A>. After you submit your application:
        </Text>
        <ul>
          <li>We’ll get back to you with our decision within 3 days</li>
          <li>
            If you’re accepted we’ll schedule a call to train you to lead your
            club
          </li>
          <li>
            We’ll give you access to our curriculum, a template for your
            meetings, and access to our online community of club leaders
          </li>
          <li>
            Once you start having club meetings we’ll check in with you each
            week to make sure everything is going well
          </li>
        </ul>
        <p>
          Contact us at <A href="mailto:team@hackclub.com">team@hackclub.com</A>{' '}
          if you have any questions while applying.
        </p>
        <Text color="slate" f={1}>
          <em>
            * We also accept applications from clubs that have already held
            meetings.
          </em>
        </Text>
      </CustomCard>
      <Flex
        align="center"
        justify="center"
        flexDirection={['column', 'row']}
        my={3}
        mx={[null, -2]}
      >
        <LargeButton.link
          w={1}
          m={2}
          to={`/apply/club?id=${id}`}
          children="Edit Application"
        />
        <LargeButton.link
          w={1}
          m={2}
          to={`/apply/leader?id=${leaderProfile.id}`}
          children="Edit Leader Profile"
        />
      </Flex>
      <CustomCard>
        <CustomHeading>Application</CustomHeading>
        <ul>
          <li>
            This application was{' '}
            {updated_at === created_at ? 'created' : 'updated'}{' '}
            <strong>{timeSince(updated_at)}</strong> ago
          </li>
          {submitted_at ? (
            <li>
              You submitted this application{' '}
              <strong>{timeSince(submitted_at)}</strong> ago
            </li>
          ) : (
            <li>
              You have <Neg /> submitted your application
            </li>
          )}
        </ul>
        <CustomHeading>Leader Profiles</CustomHeading>
        <ul>
          <li>
            You have {leaderProfile.completed_at ? null : <Neg />} finished your
            leader profile
          </li>
          {coLeaderProfiles.map((profile, index) => (
            <li key={index}>
              <strong>{profile.applicant.email} </strong>
              {profile.completed_at ? null : (
                <span>
                  has <Neg />{' '}
                </span>
              )}
              finished their leader profile
            </li>
          ))}
        </ul>
      </CustomCard>
    </Container>
  )
}

class ApplicationIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'loading',
      app: undefined,
      authToken: undefined,
      applicantId: undefined
    }
  }

  componentDidMount() {
    const authToken = window.localStorage.getItem('authToken')
    const applicantId = window.localStorage.getItem('applicantId')
    this.setState({ authToken, applicantId })
    const needsToAuth = authToken === null || applicantId === null

    if (needsToAuth) {
      this.setState({ status: 'needsToAuth' })
    } else {
      // Populate the list of applications
      fetch(`${api}/v1/applicants/${applicantId}/new_club_applications`, {
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
            return fetch(
              `${api}/v1/applicants/${applicantId}/new_club_applications`,
              {
                method: 'POST',
                headers: { Authorization: `Bearer ${authToken}` }
              }
            ).then(res => {
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
            <ApplicationCard app={app} applicantId={applicantId} />
          </Fragment>
        )
      default:
        return <Text>Something terrible has happened.</Text>
    }
  }

  render() {
    return (
      <ThemeProvider>
        <Head>
          <title>Apply – Hack Club</title>
        </Head>
        {this.content()}
      </ThemeProvider>
    )
  }
}

export default ApplicationIndex
