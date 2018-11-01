import React, { Component, Fragment } from 'react'
import api from 'api'
import Auth from 'components/Auth'
import { isURL } from 'validator'
import {
  Box,
  Card,
  Flex,
  Label,
  Heading,
  Text,
  Button,
  Input,
  theme,
} from '@hackclub/design-system'

class CarouselSubmissionForm extends Component {
  state = { verifying: false, requestingSubmission: false }

  onClickSubmitButton() {
    const { workshopSlug, submissionData } = this.props
    const { requestingSubmission } = this.state
    const { liveUrl, codeUrl } = submissionData

    // To prevent double-click resubmissions
    if (requestingSubmission) return
    this.setState({ requestingSubmission: true })

    api
      .post(`v1/workshops/${workshopSlug}/projects`, {
        method: 'POST',
        body: JSON.stringify({
          live_url: liveUrl,
          code_url: codeUrl,
          // screenshot_id: screenshotId
        }),
        headers: { 'Content-Type': 'application/json' },
      })
      // For now, just refresh the page. Needs a real Submssion Complete page eventually.
      .then(resp => location.reload())
  }

  onChangeLiveURL(event) {
    const liveUrl = event.target.value
    const { submissionData } = this.props
    this.props.setSubmissionData({ ...submissionData, liveUrl })
  }

  onChangeCodeURL(event) {
    const codeUrl = event.target.value
    const { submissionData } = this.props
    this.props.setSubmissionData({ ...submissionData, codeUrl })
  }

  onClickVeryifyButton() {
    this.setState({ verifying: true })
  }

  render() {
    const {
      workshopSlug,
      submissionData,
      authed,
      authData,
      onSignOut,
    } = this.props

    const { verifying, requestingSubmission } = this.state

    const { liveUrl, codeUrl } = submissionData

    const onClickSubmitButton = this.onClickSubmitButton.bind(this)
    const onClickVeryifyButton = this.onClickVeryifyButton.bind(this)

    const onChangeLiveURL = this.onChangeLiveURL.bind(this)
    const onChangeCodeURL = this.onChangeCodeURL.bind(this)

    const validURLs = isURL(liveUrl) && isURL(codeUrl)

    const disableSubmission = !validURLs || requestingSubmission

    return (
      <Flex
        p={4}
        bg="#FFF"
        style={{
          margin: 10,
          borderRadius: 5,
          flexGrow: 1,
          flexShrink: 1,
          flexDirection: 'column',
          alignSelf: 'center',
        }}
      >
        {verifying ? null : (
          <Fragment>
            <Flex m={1} style={{ alignItems: 'center' }}>
              <Label style={{ width: 150 }}>Live URL</Label>
              <Input
                placeholder="(where's the final product?)"
                value={liveUrl}
                onChange={onChangeLiveURL}
              />
            </Flex>
            <Flex m={1} style={{ alignItems: 'center' }}>
              <Label style={{ width: 150 }}>Code URL</Label>
              <Input
                placeholder="(where's the code?)"
                value={codeUrl}
                onChange={onChangeCodeURL}
              />
            </Flex>
          </Fragment>
        )}
        {authed || !verifying ? null : (
          <Heading.h4 m={2} mb={2} style={{}}>
            Before you submit...
          </Heading.h4>
        )}
        {!(authed || verifying) ? null : (
          <Fragment>
            <Auth
              preAuthed={authed}
              preAuthData={authData}
              signOutCallback={onSignOut}
              loginCallback={onClickSubmitButton}
              headline={"Please prove you're human"}
              cardProps={{
                maxWidth: 20,
                p: 3,
                mb: 0,
                bg: 'primary',
              }}
              style={{ flexGrow: 1 }}
            />
          </Fragment>
        )}
        {!(authed || !verifying) ? null : (
          <Button
            m={1}
            px={3}
            py={2}
            disabled={disableSubmission}
            onClick={
              disableSubmission
                ? null
                : authed
                  ? onClickSubmitButton
                  : onClickVeryifyButton
            }
            style={{ alignSelf: 'center', flexGrow: 0 }}
          >
            {authed ? 'Submit My Thing' : 'Verify & Submit'}
          </Button>
        )}
      </Flex>
    )
  }
}

export default CarouselSubmissionForm
