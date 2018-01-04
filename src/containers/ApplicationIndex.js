import React, { Component } from 'react'
import { Head } from 'react-static'
import { api } from '../../data'
import {
  Border,
  Card,
  Container,
  Box,
  Flex,
  Lead,
  Provider,
  Heading,
  Text
} from 'rebass'
import Button from '../components/Button'
import theme, { cx, mx } from '../theme'
import LoadingAnimation from '../components/LoadingAnimation'
import Login from '../components/Login'
import ApplyNav from '../components/ApplyNav'
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
${mx[1]} {
  margin-right: 10%;
  width: 90%;
}
`

const CustomHeading = Heading.extend.attrs({
  my: 2,
  py: 2
})`
text-align: center;
${mx[1]} {
  text-align: left;
}
`

const InfoCard = Card.extend.attrs({
  bg: 'smoke',
  p: 4
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
  wrap: 'wrap-reverse',
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

const Neg = Text.extend.attrs({
  is: 'span',
  children: 'NOT',
  bold: true,
  color: 'primary'
})``

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
    <Container my="auto">
      <CustomFlex>
        <CustomBox>
          <EditButton to={`/apply/club?id=${id}`}>Edit Application</EditButton>
          <EditButton to={`/apply/leader?id=${leaderProfile.id}`}>
            Edit Leader Profile
          </EditButton>
        </CustomBox>
        <CustomBox>
          <InfoCard>
            <Lead>Application</Lead>
            <ul>
              {updated_at === created_at ? (
                <li>This application was just created</li>
              ) : submitted_at ? null : (
                <li>
                  This application was updated{' '}
                  <strong>{timeSince(updated_at)}</strong> ago
                </li>
              )}
              {submitted_at ? (
                <li>
                  You submitted this application{' '}
                  <strong>{timeSince(submitted_at)}</strong> ago
                </li>
              ) : (
                <li>
                  You have <Neg>NOT</Neg> submitted your application
                </li>
              )}
            </ul>
            <Lead>Leaders</Lead>
            <ul>
              <li>
                You have{leaderProfile.completed_at ? null : <Neg> NOT</Neg>}{' '}
                finished your leader profile
              </li>
              {coLeaderProfiles.map((profile, index) => (
                <li key={index}>
                  <strong>{profile.applicant.email}</strong>
                  {profile.completed_at ? null : (
                    <span>
                      {' '}
                      has <Neg>NOT</Neg>
                    </span>
                  )}{' '}
                  finished their leader profile
                </li>
              ))}
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
          <div>
            <ApplyNav breadcrumb={0} />
            <Container>
              <Border top bottom color={cx('smoke')}>
                <CustomHeading>Apply to Hack Club</CustomHeading>
              </Border>
            </Container>
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
        <Head>
          <title children="Apply" />
        </Head>
        {this.content()}
      </Provider>
    )
  }
}

export default ApplicationIndex
