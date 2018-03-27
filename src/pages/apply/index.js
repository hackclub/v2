import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import api from 'api'
import storage from 'storage'
import {
  Box,
  Button,
  Card,
  Container,
  Section,
  Flex,
  Heading,
  LargeButton,
  Link as DSLink,
  Text as T,
  cx
} from '@hackclub/design-system'
import { clubApplicationSchema } from 'components/apply/ClubApplicationForm'
import ApplyNav from 'components/apply/ApplyNav'
import LeaderInviteForm from 'components/apply/LeaderInviteForm'
import Login from 'components/apply/Login'
import SubmitButton from 'components/apply/SubmitButton'
import LoadingAnimation from 'components/LoadingAnimation'
import fetch from 'unfetch'
import Link from 'gatsby-link'
import { timeSince } from 'helpers'

LargeButton.link = LargeButton.withComponent(Link)

const A = DSLink.extend`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const Text = props => <T mt={3} mb={3} {...props} />

const Span = T.span

const Neg = () => <Span color="error" bold children="NOT" />

const CustomCard = Card.extend.attrs({
  p: [3, 4],
  color: 'black',
  bg: 'snow',
  w: 1,
  boxShadowSize: 'md'
})``

const ApplicationCard = props => {
  const {
    id,
    leader_profiles,
    updated_at,
    created_at,
    submitted_at,
    point_of_contact_id
  } = props.app
  const { authToken, callback, app, resetCallback } = props

  const leaderProfile = leader_profiles.find(
    profile => profile.user.id == props.userId
  )
  const coLeaderProfiles = leader_profiles.filter(
    profile => profile.user.id != props.userId
  )
  const isPoc = leaderProfile.user.id === point_of_contact_id

  const completeProfiles = leader_profiles.every(
    profile => profile.completed_at
  )
  const completeApplication = clubApplicationSchema.isValidSync(app)
  let submitButtonStatus
  if (app.submitted_at) {
    submitButtonStatus = 'submitted'
  } else if (completeApplication && completeProfiles) {
    submitButtonStatus = 'complete'
  } else {
    submitButtonStatus = 'incomplete'
  }

  return (
    <Container maxWidth={36} my={3} p={3}>
      {app.rejected_at ? (
        <Flex mb={4}>
          <CustomCard>
            <Heading.h3>Unfortunately, you’ve been rejected</Heading.h3>
            <br />
            <Text>
              You can start a new application by clicking{' '}
              <A onClick={resetCallback}>here</A>.
            </Text>
          </CustomCard>
        </Flex>
      ) : null}
      <CustomCard>
        <Heading.h3 mb={2}>How to get into Hack Club</Heading.h3>

        <Text>
          Our admissions process is very competitive, accepting less than 5% of
          applicants. Here’s what we look for:
        </Text>
        <ul>
          <li>
            Strong founding teams with 2-3 members. You probably can’t do it
            alone and we rarely accept solo founders.
          </li>
          <li>
            Diverse skillsets on leadership team – the best Hack Clubs are led
            by both CEO and CTO types.
          </li>
          <li>
            Traction. Indicators of progress to date, especially formal shows of
            support from your school (like securing a teacher sponsor), are very
            meaningful.
          </li>
        </ul>
        <Text>
          At the end of the day, to start a successful Hack Club all you have to
          do are two things: make a club that people want to attend and get it
          in front of the right people in the right way.
        </Text>
        <Text>
          Though we wish we could work with more clubs, our low acceptance rate
          is simply a result of too much interest and not enough time.
        </Text>
        <Heading.h3>After you apply</Heading.h3>
        <ul>
          <li>We’ll get back to you with our decision in 7 days</li>
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
        <Heading.h3>
          {submitted_at ? 'Your' : 'Edit your'} application
        </Heading.h3>
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
              finished their leader profile{' '}
              {isPoc ? (
                <Fragment>
                  (
                  <A
                    onClick={e => {
                      if (
                        confirm(
                          `Are you sure you want to remove ${
                            profile.user.email
                          } as a team member?`
                        )
                      ) {
                        api
                          .delete(
                            `v1/new_club_applications/${id}/remove_user`,
                            {
                              authToken,
                              data: { user_id: profile.user.id }
                            }
                          )
                          .then(json => {
                            callback()
                          })
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    remove
                  </A>
                  )
                </Fragment>
              ) : null}
            </li>
          ))}
        </ul>
        <Text mb={0}>Invite your co-leads:</Text>
        <LeaderInviteForm id={id} authToken={authToken} callback={callback} />
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
        mt={4}
        mx={[null, -2]}
      >
        <LargeButton.link
          w={1}
          m={2}
          inverted
          to={`/apply/club?id=${id}`}
          children={`${submitted_at ? 'View' : 'Edit'} Application`}
        />
        <LargeButton.link
          w={1}
          m={2}
          inverted
          to={`/apply/leader?id=${leaderProfile.id}`}
          children={`${submitted_at ? 'View' : 'Edit'} Leader Profile`}
        />
      </Flex>
      <Flex mt={2} mb={4}>
        <SubmitButton
          authToken={authToken}
          applicationId={app.id}
          status={submitButtonStatus}
          callback={callback}
        />
      </Flex>
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
    this.createNewApplication = this.createNewApplication.bind(this)
    this.resetApplication = this.resetApplication.bind(this)
  }

  createNewApplication(firstTime = false) {
    const msg =
      'If you start a new application you won’t be able to access this one. Continue?'
    if (!firstTime && !confirm(msg)) {
      return null
    }
    return api
      .post(`v1/users/${storage.get('userId')}/new_club_applications`, {
        authToken: storage.get('authToken')
      })
      .then(app => {
        return app
      })
  }

  resetApplication() {
    this.createNewApplication().then(app => {
      this.setState({
        status: 'finished',
        app: app
      })
    })
  }

  populateApplications(application = null) {
    if (application) {
      this.setState({
        status: 'finished',
        app: application
      })
    } else {
      api
        .get(`v1/users/${storage.get('userId')}/new_club_applications`, {
          authToken: storage.get('authToken')
        })
        .then(json => {
          if (json.length === 0) {
            return this.createNewApplication(true)
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
          if (e.status === 401) {
            this.setState({ status: 'needsToAuth' })
          }
        })
    }
  }

  componentDidMount() {
    const authToken = storage.get('authToken')
    const userId = storage.get('userId')
    this.setState({ authToken, userId })
    const needsToAuth = authToken === null || userId === null

    if (needsToAuth) {
      this.setState({ status: 'needsToAuth' })
    } else {
      this.populateApplications()
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
              resetCallback={this.resetApplication}
            />
          </Fragment>
        )
      default:
        return <Text>Something terrible has happened.</Text>
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet title="Apply – Hack Club" />
        {this.content()}
      </Fragment>
    )
  }
}
