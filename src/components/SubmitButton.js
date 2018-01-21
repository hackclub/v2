import React, { Component } from 'react'
import api from '../api'
import { LargeButton } from '@hackclub/design-system'
import { clubApplicationSchema } from './ClubApplicationForm'


export default class extends Component {
  constructor(props) {
    super(props)

    this.state = { readyToSubmit: false, submitted: false }
  }

  componentWillMount() {
    const { authToken, application } = this.props

    let readyToSubmit = clubApplicationSchema.isValidSync(application)

    if (readyToSubmit) {
      application.applicant_profiles.forEach(profile => {
        if (profile.completed_at === null) {
          readyToSubmit = false
        }
      })
    }

    if (application.submitted_at) {
      readyToSubmit = false
      this.setState({submitted: true})
    }

    this.setState({readyToSubmit})
  }

  handleSubmit() {
    api
      .post(`v1/new_club_applications/${application.id}/submit`, { authToken })
      .then(() => {
        alert('Your application has been submitted!')
      })
      .catch(e => {
        alert(e.statusText)
      })
  }

  render() {
    const { readyToSubmit, submitted } = this.state
    return (
      <LargeButton onClick={this.handleSubmit} w={1} mb={2} inverted bg={readyToSubmit ? "success" : "primary"} disabled={!readyToSubmit}>
        {submitted ? 'We’ve recieved your application' : 'Submit your application'}
      </LargeButton>
    )
  }
}
