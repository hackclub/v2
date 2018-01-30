import React, { Component, Fragment } from 'react'
import { Box, Button, Flex, Heading, Text } from '@hackclub/design-system'
import { AutoSaver, Field, Form } from 'components/Forms'
import Login from 'components/Login'
import Table from 'components/Table'
import LogoutButton from 'components/LogoutButton'
import LoadingAnimation from 'components/LoadingAnimation'
import { Formik } from 'formik'
import api from 'api'

const Inspector = props => {
  const { authToken, application, updateApplicationList } = props
  const transformedApplication = {
    ...application,
    interview_duration: application.interview_duration
      ? application.interview_duration / 60
      : null,
    interviewed_at: application.interviewed_at
      ? application.interviewed_at.substr(0, 10)
      : null
  }

  return (
    <Formik
      initialValues={transformedApplication}
      enableReinitialize={true}
      onSubmit={(values, { props, setSubmitting }) => {
        const transformedValues = { ...values }
        if (values.interview_duration) {
          transformedValues.interview_duration = values.interview_duration * 60
        }
        api
          .patch(`v1/new_club_applications/${values.id}`, {
            authToken,
            data: transformedValues
          })
          .then(json => {
            setSubmitting(false)
            updateApplicationList(json)
          })
          .catch(e => {
            setSubmitting(false)
          })
      }}
    >
      {props => {
        const {
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          values
        } = props

        return (
          <Form onSubmit={handleSubmit}>
            <Heading>App #{values.id}</Heading>
            <Field
              name="interview_notes"
              label="Interview notes"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.interview_notes}
              type="textarea"
            />
            <Field
              name="interviewed_at"
              label="Interview date"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.interviewed_at}
              type="date"
            />
            <Field
              name="interview_duration"
              label="Interview duration (minutes)"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.interview_duration}
              type="number"
            />
            <AutoSaver
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              values={values}
            />
          </Form>
        )
      }}
    </Formik>
  )
}

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
    const { authToken, status, clubApplications, selection } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'needsToAuth':
        return <Login userType="admin" />
      case 'success':
        return (
          <Fragment>
            <Flex justify="flex-end">
              <LogoutButton m={2} inverted={false} />
            </Flex>
            <Flex>
              <Box>
                <Table
                  headers={['ID', 'Name', 'URL', 'POC', 'Interview']}
                  rows={Object.values(clubApplications).map(application => (
                    {
                      'ID': application.id,
                      'Name': application.high_school_name,
                      'URL': application.high_school_url,
                      'POC': this.pointOfContact(application),
                      'Interview':
                        (<Button
                          bg="info"
                          inverted={
                            !selection || selection.id !== application.id
                          }
                          disabled={!application.submitted_at}
                          onClick={() => {
                            this.setState({ selection: application })
                          }}
                          children="✍"
                        />)
                    }
                  ))}
                />
              </Box>
              {selection && (
                <Box>
                  <Inspector
                    authToken={authToken}
                    application={selection}
                    updateApplicationList={this.updateApplicationList}
                  />
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
