import React, { Component, Fragment } from 'react'
import api from 'api'
import { isURL } from 'validator'
import styled from 'styled-components'
import Auth from 'components/Auth'
import { Flex, Heading, Button, Field, theme } from '@hackclub/design-system'

const CarouselSubmissionFormOuter = styled(Flex).attrs({
  p: [3, 3, 4],
  bg: 'white',
  align: 'center',
  flexDirection: 'column'
})`
  border-radius: 5px;
  flex-grow: 1;
  flex-shrink: 1;
  ${theme.mediaQueries.md} {
    border-radius: 10px;
  }
`

const LiveField = styled(Field).attrs({
  label: 'Live URL',
  name: 'Live URL',
  placeholder: '(where’s the final product?)',
  type: 'url'
})`
  min-width: 320px;
`

const CodeField = styled(Field).attrs({
  label: 'Code URL',
  name: 'Code URL',
  placeholder: '(where’s the code?)',
  type: 'url',
  mb: [1, 2, 3]
})`
  min-width: 320px;
`

class CarouselSubmissionForm extends Component {
  state = { verifying: false, requestingSubmission: false }

  onClickSubmitButton = () => {
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
          code_url: codeUrl
          // Screenshot happens on backend for now
          // screenshot_id: screenshotId
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      // For now, just refresh the page. Needs a real Submssion Complete page eventually.
      .then(() => window.location.reload())
  }

  onChangeLiveURL = e => {
    const liveUrl = e.target.value
    const { submissionData } = this.props
    this.props.setSubmissionData({ ...submissionData, liveUrl })
  }

  onChangeCodeURL = e => {
    const codeUrl = e.target.value
    const { submissionData } = this.props
    this.props.setSubmissionData({ ...submissionData, codeUrl })
  }

  onClickVeryifyButton = () => {
    this.setState({ verifying: true })
  }

  render() {
    const {
      // workshopSlug,
      submissionData,
      authed,
      authData,
      onSignOut
    } = this.props

    const { verifying, requestingSubmission } = this.state

    const { liveUrl, codeUrl } = submissionData

    const {
      onClickSubmitButton,
      onClickVeryifyButton,
      onChangeLiveURL,
      onChangeCodeURL
    } = this

    const validURLs = isURL(liveUrl) && isURL(codeUrl)

    const disableSubmission = !validURLs || requestingSubmission

    return (
      <CarouselSubmissionFormOuter>
        {verifying ? null : (
          <Fragment>
            <LiveField value={liveUrl} onChange={onChangeLiveURL} />
            <CodeField value={codeUrl} onChange={onChangeCodeURL} />
          </Fragment>
        )}
        {authed || !verifying ? null : (
          <Heading.h4 mb={2}>Before you submit…</Heading.h4>
        )}
        {!(authed || verifying) ? null : (
          <Fragment>
            <Auth
              preAuthed={authed}
              preAuthData={authData}
              signOutCallback={onSignOut}
              loginCallback={onClickSubmitButton}
              headline="Show that you’re human"
              cardProps={{
                maxWidth: 20,
                p: 3,
                mb: 0,
                bg: 'primary'
              }}
            />
          </Fragment>
        )}
        {!(authed || !verifying) ? null : (
          <Button
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
          >
            {authed ? 'Submit My Thing' : 'Verify & Submit'}
          </Button>
        )}
      </CarouselSubmissionFormOuter>
    )
  }
}

export default CarouselSubmissionForm
