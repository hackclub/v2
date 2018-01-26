import React, { Component } from 'react'
import api from '../api'
import { LargeButton } from '@hackclub/design-system'
import { clubApplicationSchema } from './ClubApplicationForm'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = { readyToSubmit: false, submitted: false }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { application } = this.props
    const allProfilesFinished = !application.applicant_profiles.some(
      p => p.completed_at === null
    )
    const validApp = clubApplicationSchema.isValidSync(application)
    const unsubmittedApp = application.submitted_at === null

    if (allProfilesFinished && validApp && unsubmittedApp) {
      this.setState({
        readyToSubmit: true
      })
    }

    if (application.submitted_at) {
      this.setState({
        submitted: true
      })
    }
  }

  handleSubmit() {
    const { authToken, application } = this.props
    const { readyToSubmit, submitted } = this.state

    if (submitted || !readyToSubmit) {
      return null
    }

    api
      .post(`v1/new_club_applications/${application.id}/submit`, { authToken })
      .then(() => {
        alert('Your application has been submitted!')
        this.setState({ submitted: true })
      })
      .catch(e => {
        alert(e.statusText)
      })
  }

  render() {
    const { readyToSubmit, submitted } = this.state

    return (
      <LargeButton
        onClick={this.handleSubmit}
        bg={readyToSubmit ? 'success' : 'primary'}
        disabled={submitted || !readyToSubmit}
        w={1}
        mb={2}
      >
        {submitted
          ? 'We’ve recieved your application'
          : 'Submit your application'}
      </LargeButton>
    )
  }
}
