import React, { Component, Fragment } from 'react'
import {
  ThemeProvider,
  Container,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Badge
} from '@hackclub/design-system'
import { AutoSaver, Field, Form } from 'components/Forms'
import Login from 'components/apply/Login'
import Table from 'components/Table'
import LogoutButton from 'components/apply/LogoutButton'
import LoadingAnimation from 'components/LoadingAnimation'
import InterviewForm from 'components/admin/InterviewForm'
import RejectionForm from 'components/admin/RejectionForm'
import Information from 'components/admin/Information'
import NotesForm from 'components/admin/NotesForm'
import { Formik } from 'formik'
import api from 'api'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = { status: 'loading' }
    this.updateApplicationList = this.updateApplicationList.bind(this)
  }

  componentDidMount() {
    const authToken = window.localStorage.getItem('authToken')
    this.setState({ authToken })

    api
      .get('v1/new_club_applications', { authToken })
      .then(json => {
        let clubApplications = {}
        json.forEach(app => {
          if (app.submitted_at) {
            clubApplications[app.id] = app
          }
        })
        this.setState({
          status: 'success',
          clubApplications
        })
      })
      .catch(e => {
        if (e.status === 401) {
          this.setState({ status: 'needsToAuth' })
        } else {
          this.setState({ status: 'error' })
        }
      })
  }

  updateApplicationList(updatedApplication) {
    const { clubApplications } = this.state
    clubApplications[updatedApplication.id] = updatedApplication

    this.setState({ clubApplications })
  }

  pointOfContact(application) {
    const profile = application.leader_profiles.find(
      profile =>
        profile.user && profile.user.id === application.point_of_contact_id
    )

    return profile && profile.user.email
  }

  active(application, prop) {
    const { selection, selectType } = this.state
    return selection && selection.id === application.id && selectType === prop
  }

  render() {
    const {
      authToken,
      status,
      clubApplications,
      selection,
      selectType
    } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'needsToAuth':
        return <Login userType="admin" />
      case 'success':
        return (
          <Container maxWidth={80} p={[3, 4]}>
            <Flex
              flexDirection={['column', 'row']}
              justify="space-between"
              align="center"
              wrap
            >
              <Heading.h1 f={[5, 6]}>Dashboard</Heading.h1>
              <LogoutButton inverted={false} />
            </Flex>
            <Heading.h2 color="muted" f={4} mt={2} regular>
              Hello, it’s{' '}
              {new Date().toLocaleDateString('en-us', { weekday: 'long' })}
              {'. '}You’re doing great.
            </Heading.h2>
            <Flex justify="center" mt={[3, 4]}>
              <Table
                headers={[
                  'ID',
                  'Name',
                  'POC',
                  'Interview',
                  'Notes',
                  'Rejected',
                  'Info'
                ]}
                rows={Object.values(clubApplications).map(application => ({
                  ID: <Badge bg="info" children={application.id} />,
                  Name: application.high_school_name,
                  POC: this.pointOfContact(application),
                  Interview: (
                    <Button
                      bg="info"
                      inverted={!this.active(application, 'interview')}
                      disabled={!application.submitted_at}
                      onClick={() => {
                        this.setState({
                          selection: application,
                          selectType: 'interview'
                        })
                      }}
                      children="✍️"
                    />
                  ),
                  Notes: (
                    <Button
                      bg="info"
                      inverted={!this.active(application, 'notes')}
                      disabled={!application.submitted_at}
                      onClick={() => {
                        this.setState({
                          selection: application,
                          selectType: 'notes'
                        })
                      }}
                      children="✍️"
                    />
                  ),
                  Rejected: (
                    <Button
                      bg="info"
                      inverted={!this.active(application, 'rejected')}
                      disabled={!application.submitted_at}
                      onClick={() => {
                        this.setState({
                          selection: application,
                          selectType: 'rejected'
                        })
                      }}
                      children="✍️"
                    />
                  )
                }))}
              />
              {selection && (
                <Flex
                  flexDirection="column"
                  flex="1 1 auto"
                  ml={[null, 4]}
                  style={{ minWidth: '18rem' }}
                >
                  {selectType === 'rejected' ? (
                    <RejectionForm
                      authToken={authToken}
                      application={selection}
                      updateApplicationList={this.updateApplicationList}
                    />
                  ) : null}
                  {selectType === 'notes' ? (
                    <NotesForm authToken={authToken} application={selection} />
                  ) : null}
                  {selectType === 'interview' ? (
                    <InterviewForm
                      authToken={authToken}
                      application={selection}
                      updateApplicationList={this.updateApplicationList}
                    />
                  ) : null}
                </Flex>
              )}
            </Flex>
          </Container>
        )
      default:
        return (
          <Text color="error" py={3} align="center">
            🚨 Something terrible has happened 🚨
          </Text>
        )
    }
  }
}
export default () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
)
