import React, { Component, Fragment } from 'react'
import { Box, Button, Flex, Heading, Text } from '@hackclub/design-system'
import { AutoSaver, Field, Form } from 'components/Forms'
import Login from 'components/apply/Login'
import Table from 'components/Table'
import LogoutButton from 'components/apply/LogoutButton'
import LoadingAnimation from 'components/LoadingAnimation'
import InterviewForm from 'components/admin/InterviewForm'
import NotesForm from 'components/admin/NotesForm'
import { Formik } from 'formik'
import api from 'api'

export default class extends Component {
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
          <Fragment>
            <Flex justify="flex-end">
              <LogoutButton m={2} inverted={null} bg="info" />
            </Flex>
            <Flex>
              <Box>
                <Table
                  headers={['ID', 'Name', 'POC', 'Interview', 'Notes']}
                  rows={Object.values(clubApplications).map(application => ({
                    ID: application.id,
                    Name: application.high_school_name,
                    POC: this.pointOfContact(application),
                    Interview: (
                      <Button
                        bg="info"
                        inverted={
                          !(
                            selection &&
                            selection.id === application.id &&
                            selectType === 'interview'
                          )
                        }
                        disabled={!application.submitted_at}
                        onClick={() => {
                          this.setState({
                            selection: application,
                            selectType: 'interview'
                          })
                        }}
                        children="✍"
                      />
                    ),
                    Notes: (
                      <Button
                        bg="info"
                        inverted={
                          !(
                            selection &&
                            selection.id === application.id &&
                            selectType === 'notes'
                          )
                        }
                        disabled={!application.submitted_at}
                        onClick={() => {
                          this.setState({
                            selection: application,
                            selectType: 'notes'
                          })
                        }}
                        children="✍"
                      />
                    )
                  }))}
                />
              </Box>
              {selection && (
                <Box>
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
                </Box>
              )}
            </Flex>
          </Fragment>
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
